import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/request/api";
import { links } from "@/request/links";
import { toast } from "react-toastify";
import { useState } from "react";
import {
  TEST_FORMATS,
  type Question,
  type Taxamony,
  type TestFormValues,
} from "@/widgets/test/hook/test-types";
import type { AiState } from "../ui/create-test-modal";
import { createEmptyQuestion } from "@/widgets/test/ui/question-editor";
import { mockSubjects } from "@/widgets/subject";

const testTypes = [
  { key: "ielts", label: "IELTS" },
  { key: "sat", label: "SAT" },
  { key: "dtm", label: "DTM" },
  { key: "milliy_sertifikat", label: "Milliy Sertifikat" },
  { key: "generic", label: "Generic" },
];

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

interface UploadJobResponse {
  id: string;
  source_file: string;
  topic: number;
  test_type: string;
}

export interface TestMeta {
  title: string;
  subjectId: number;
  format: TestFormValues["format"];
  durationMinutes: number;
}

const emptyMeta: TestMeta = {
  title: "",
  subjectId: 0,
  format: TEST_FORMATS[0],
  durationMinutes: 60,
};

type Tab = "ai" | "manual";

interface CreateTestHookProps {
  onClose: () => void;
}

export function useCreateTest({ onClose }: CreateTestHookProps) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [meta, setMeta] = useState(emptyMeta);
  const [aiState, setAiState] = useState<AiState>("idle");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("ai");

  const { data: taxamonyTree } = useQuery({
    queryKey: ["taxamony-tree"],
    queryFn: async () => {
      const res = await api.get<Taxamony[]>(links.subjects.taxonomyTree);
      return res.data;
    },
  });

  const { mutate: manualCreate } = useMutation({
    mutationKey: [""],
    mutationFn: ({ data }: any) => api.post(links.exams.examinations, data),
    onSuccess: () => {
      console.log("manual");
    },
    onError: (error) => {
      console.log("create exam: ", error);
      console.log("manual");
    },
  });

  const { mutate: aiCreate } = useMutation({
    mutationKey: [""],
    mutationFn: ({ data, id }: any) =>
      api.post(links.aiParser.jobQuestionsConfirmAll(String(id)), data),
    onSuccess: () => {
      console.log("ai");
    },
    onError: (error) => {
      console.log("create exam: ", error);
      console.log("ai");
    },
  });

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
    mutationFn: ({ file, type }: { file: File; type: string }) => {
      const formData = new FormData();
      formData.append("source_file", file);
      formData.append("topic", String(meta.subjectId));
      formData.append("test_type", type);
      return api.post<UploadJobResponse>(links.aiParser.jobUpload, formData);
    },
    onSuccess: ({ data }) => {
      setAiState("processing");
      aiQuestions(data.id); // qattiq yozilgan "1" o'rniga haqiqiy job ID
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
    if (file.size > MAX_FILE_SIZE_BYTES) {
      toast.error(
        `Fayl hajmi ${MAX_FILE_SIZE_BYTES / (1024 * 1024)} MB dan oshmasligi kerak (yuklangan fayl: ${(file.size / (1024 * 1024)).toFixed(1)} MB)`,
      );
      return; // fileUpload umuman chaqirilmaydi
    }

    setFileName(file.name);
    setAiState("processing");
    const TestType = testTypes.find((t) => t.label === meta.format);
    fileUpload({ file: file, type: TestType?.key || "" });

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

  const validateAndSubmit = () => {
    if (!meta.title.trim()) return setError("Test nomini kiriting.");
    if (!meta.subjectId) return setError("Fanni tanlang.");
    if (questions.length === 0) return setError("Kamida bitta savol qo'shing.");
    const hasEmptyQuestion = questions.some(
      (q) => !q.text.trim() || q.options.some((o) => !o.text.trim()),
    );
    if (hasEmptyQuestion)
      return setError("Barcha savol va variant matnlarini to'ldiring.");

    setError(null);
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

  const handleCreate = () => {
    validateAndSubmit();
    const subject = mockSubjects.find((s) => s.id === String(meta.subjectId));
    const newTest = {
      id: `test_${Date.now()}`,
      title: meta.title,
      subjectId: meta.subjectId,
      subjectName: subject?.name ?? "—",
      format: meta.format,
      questionsCount: questions.length,
      totalBall: questions.reduce((sum, q) => sum + q.ball, 0),
      durationMinutes: meta.durationMinutes,
      status: "Nashr qilingan",
      createdAt: new Date().toISOString(),
      createdVia: tab === "ai" ? "ai" : "manual",
      questions: questions,
    };
    if (tab === "ai") {
      aiCreate({ data: newTest, id: 1 });
    } else {
      manualCreate({ data: newTest });
    }
  };

  return {
    handleCreate,
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
    taxamonyTree,
  };
}
