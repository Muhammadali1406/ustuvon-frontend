import { useCallback, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { api } from "@/request/api";
import { links } from "@/request/links";
import type { AiReviewJob, AiReviewReport } from "./ai-review-types";

const MAX_WAIT_MS = 180_000;
const MAX_POLL_FAILURES = 3;
const CANCELLED = "ai-review-cancelled";

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

function toErrorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    const status = error.response?.status;
    if (status === 429) return "Juda ko'p so'rov yuborildi. Birozdan keyin qayta urinib ko'ring.";
    if (status === 503) return "AI tahlil xizmati hozircha mavjud emas.";
    const serverMessage = (error.response?.data as { error?: { message?: string } } | undefined)?.error?.message;
    if (serverMessage) return serverMessage;
    if (!error.response) return "Internet bilan aloqa yo'q. Qayta urinib ko'ring.";
  } else if (error instanceof Error && error.message !== CANCELLED) {
    return error.message;
  }
  return "Tahlilni olishda xatolik yuz berdi. Qayta urinib ko'ring.";
}

export type AiReviewStatus = "idle" | "loading" | "done" | "error";

export interface AiReviewState {
  status: AiReviewStatus;
  report: AiReviewReport | null;
  errorMessage: string | null;
  start: () => void;
  reset: () => void;
}

/**
 * Starts an AI review of the finished exam and polls until it is ready.
 * `answers` is the same { questionId: optionId } object sent to /submit/.
 */
export function useAiReview({
  examId,
  answers,
}: {
  examId: string;
  answers: Record<string, string>;
}): AiReviewState {
  const cancelled = useRef(false);

  useEffect(() => {
    cancelled.current = false;
    return () => {
      cancelled.current = true;
    };
  }, []);

  const mutation = useMutation({
    // The global overlay would block the whole screen for the whole review.
    meta: { silent: true },
    mutationFn: async (): Promise<AiReviewReport> => {
      const { data: started } = await api.post<AiReviewJob>(links.aiReviewer.reviews, {
        exam_id: Number(examId),
        answers,
        language: "uz",
      });

      let job = started;
      const startedAt = Date.now();
      let failures = 0;

      while (job.status === "processing") {
        if (cancelled.current) throw new Error(CANCELLED);
        if (Date.now() - startedAt > MAX_WAIT_MS) {
          throw new Error("Tahlil kutilganidan uzoq davom etdi. Qayta urinib ko'ring.");
        }
        await sleep((job.poll_after_seconds ?? 2) * 1000);
        if (cancelled.current) throw new Error(CANCELLED);
        try {
          const { data } = await api.get<AiReviewJob>(links.aiReviewer.reviewDetail(job.review_id));
          job = data;
          failures = 0;
        } catch (error) {
          failures += 1;
          // 404 = review expired / not ours: retrying cannot help.
          if (failures >= MAX_POLL_FAILURES || (isAxiosError(error) && error.response?.status === 404)) {
            throw error;
          }
        }
      }

      if (job.status === "failed" || !job.report) {
        throw new Error(job.error?.message ?? "AI tahlilni yaratib bo'lmadi. Qayta urinib ko'ring.");
      }
      return job.report;
    },
  });

  const { mutate, reset: resetMutation } = mutation;
  const start = useCallback(() => mutate(), [mutate]);
  const reset = useCallback(() => resetMutation(), [resetMutation]);

  const status: AiReviewStatus = mutation.isPending
    ? "loading"
    : mutation.isSuccess
      ? "done"
      : mutation.isError
        ? "error"
        : "idle";

  return {
    status,
    report: mutation.data ?? null,
    errorMessage: mutation.isError ? toErrorMessage(mutation.error) : null,
    start,
    reset,
  };
}
