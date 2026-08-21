import { useMutation } from "@tanstack/react-query";
import { api } from "@/request/api";
import { links } from "@/request/links";
import { toast } from "react-toastify";
import { useState } from "react";
import {
  TEST_FORMATS,
  type Question,
  type TestFormValues,
} from "@/widgets/test/lib/test-types";
import type { AiState } from "../ui/create-test-modal";
import { createEmptyQuestion } from "@/widgets/test/ui/question-editor";

export interface TestMeta {
  title: string;
  subjectId: string;
  format: TestFormValues["format"];
  durationMinutes: number;
}

const emptyMeta: TestMeta = {
  title: "",
  subjectId: "",
  format: TEST_FORMATS[0],
  durationMinutes: 60,
};

type Tab = "ai" | "manual";

interface CreateTestHookProps {
  onSubmit: (values: TestFormValues) => void;
  onClose: () => void;
}

export function useCreateTest({ onSubmit, onClose }: CreateTestHookProps) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [meta, setMeta] = useState(emptyMeta);
  const [aiState, setAiState] = useState<AiState>("idle");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("ai");

  const { mutate: removeAiQuestion } = useMutation({
    mutationKey: [],
    mutationFn: ({ jobId, id }: { jobId: string; id: string }) =>
      api.delete(links.aiParser.jobQuestionDetail(jobId, id)),
  });

  const { mutate: aiQuestions } = useMutation({
    mutationKey: ["ai-parser/jobs/questions"],
    mutationFn: (id: string) => api.get(links.aiParser.jobQuestions(id)),
    onSuccess: (data: any) => {
      setQuestions(data);
      setAiState("review");
    },
  });

  const { mutate: fileUpload, isPending: fileUploading } = useMutation({
    mutationKey: ["ai-parser/jobs/upload"],
    mutationFn: (file: File) =>
      api.post(links.aiParser.jobUpload, file, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    onSuccess: (data) => {
      console.log("File uploaded successfully:", data);
      setAiState("processing");
      aiQuestions(String(1));
    },
    onError: (error) => {
      toast.error(
        "Faylni yuklashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.",
      );
      console.error("Error uploading file:", error);
      setAiState("failed");
    },
  });

  const handleFileSelected = (file: File) => {
    setFileName(file.name);
    setAiState("processing");
    fileUpload(file);
    if (!meta.title) {
      setMeta((m) => ({ ...m, title: file.name.replace(/\.[^.]+$/, "") }));
    }
  };

  const updateQuestion = (id: string, updated: Question) => {
    setQuestions((prev) => prev.map((q) => (q.id === id ? updated : q)));
  };

  const removeQuestion = ({
    id,
    jobId = "1",
  }: {
    id: string;
    jobId?: string;
  }) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
    tab === "ai" && removeAiQuestion({ jobId, id });
  };

  const addManualQuestion = () => {
    setQuestions((prev) => [...prev, createEmptyQuestion()]);
  };

  const validateAndSubmit = (status: TestFormValues["status"]) => {
    if (!meta.title.trim()) return setError("Test nomini kiriting.");
    if (!meta.subjectId) return setError("Fanni tanlang.");
    if (questions.length === 0) return setError("Kamida bitta savol qo'shing.");
    const hasEmptyQuestion = questions.some(
      (q) => !q.text.trim() || q.options.some((o) => !o.text.trim()),
    );
    if (hasEmptyQuestion)
      return setError("Barcha savol va variant matnlarini to'ldiring.");

    setError(null);
    onSubmit({ ...meta, status, questions });
    resetAndClose();
  };

  const resetAndClose = () => {
    setTab("ai");
    setMeta(emptyMeta);
    setQuestions([]);
    setAiState("idle");
    setFileName(null);
    setError(null);
    onClose();
  };

  return {
    handleFileSelected,
    fileUploading,
    fileName,
    aiState,
    questions,
    error,
    tab,
    setTab,
    meta,
    setMeta,
    resetAndClose,
    updateQuestion,
    removeQuestion,
    validateAndSubmit,
    addManualQuestion,
  };
}
