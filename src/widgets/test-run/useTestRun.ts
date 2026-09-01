import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { links } from "@/request/links";
import { api } from "@/request/api";
import type { ExamDetail, ExamSubmitResponse } from "./test-run-types";

type Phase = "intro" | "running" | "submitting" | "finished";

export function useTestRun({
  testId,
  subjectId,
}: {
  testId: string;
  subjectId: string;
}) {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["test-run", testId],
    queryFn: () => api.get<ExamDetail>(links.exams.examinationDetail(testId)),
    enabled: !!testId,
  });

  const testRun = data?.data;

  const [phase, setPhase] = useState<Phase>("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [secondsLeft, setSecondsLeft] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const submitMutation = useMutation({
    mutationFn: () =>
      api.post<ExamSubmitResponse>(links.exams.examinationSubmit(testId), {
        answers,
      }),
    onSuccess: (res) => {
      stopTimer();
      setPhase("finished");
      const resultId =
        res.data?.id ?? res.data?.result_uuid ?? res.data?.result;
      if (resultId) {
        navigate(
          `/app/subjects/${subjectId}/tests/${testId}/result/${resultId}`
        );
      }
    },
  });

  const startMutation = useMutation({
    mutationFn: () => api.post(links.exams.examinationStart(testId), {}),
    onSuccess: () => {
      setPhase("running");
      setSecondsLeft(testRun?.duration_time ?? 0);
    },
  });

  // Timer
  useEffect(() => {
    if (phase !== "running") return;
    timerRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          stopTimer();
          submitMutation.mutate();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return stopTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const handleStart = useCallback(() => startMutation.mutate(), [startMutation]);

  const selectAnswer = useCallback((questionId: string, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  }, []);

  const goToQuestion = useCallback(
    (index: number) => {
      const total = testRun?.questions.length ?? 0;
      if (index < 0 || index >= total) return;
      setCurrentIndex(index);
    },
    [testRun]
  );

  const handleNext = useCallback(() => goToQuestion(currentIndex + 1), [currentIndex, goToQuestion]);
  const handlePrev = useCallback(() => goToQuestion(currentIndex - 1), [currentIndex, goToQuestion]);

  const handleSubmit = useCallback(() => {
    stopTimer();
    setPhase("submitting");
    submitMutation.mutate();
  }, [stopTimer, submitMutation]);

  const answeredCount = useMemo(() => Object.keys(answers).length, [answers]);

  return {
    testRun,
    isLoading,
    isError,
    phase,
    currentIndex,
    currentQuestion: testRun?.questions[currentIndex],
    totalQuestions: testRun?.questions.length ?? 0,
    answers,
    answeredCount,
    secondsLeft,
    isStarting: startMutation.isPending,
    isSubmitting: submitMutation.isPending,
    handleStart,
    selectAnswer,
    goToQuestion,
    handleNext,
    handlePrev,
    handleSubmit,
  };
}