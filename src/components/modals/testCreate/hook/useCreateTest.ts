import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/request/api";
import { links } from "@/request/links";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import {
  TEST_FORMATS,
  type Question,
  type Taxamony,
  type TestFormValues,
} from "@/widgets/test/hook/test-types";
import type { AiState } from "../ui/create-test-modal";
import { createEmptyQuestion } from "@/widgets/test/ui/question-editor";
// import { mockSubjects } from "@/widgets/subject";
import type {
  PaginatedParsedQuestions,
  ParsingJob,
} from "./teast-create-types";
import { mapParsedQuestion } from "./utils";

export const testTypes = [
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
  refetch: () => void;
}

export function useCreateTest({ onClose, refetch }: CreateTestHookProps) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [meta, setMeta] = useState(emptyMeta);
  const [aiState, setAiState] = useState<AiState>("idle");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("ai");
  const [jobId, setJobId] = useState<string | null>(null);

  const resetAndClose = () => {
    setTab("ai");
    setMeta(emptyMeta);
    setQuestions([]);
    setAiState("idle");
    setFileName(null);
    setError(null);
    onClose();
  };

  const { data: job } = useQuery({
    queryKey: ["ai-parser-job", jobId],
    queryFn: async () => {
      const { data } = await api.get<ParsingJob>(
        links.aiParser.jobDetail(jobId!),
      );
      return data;
    },
    enabled: Boolean(jobId),
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      return status === "pending" || status === "processing" ? 2000 : false;
    },
  });

  const { data: parsedQuestions } = useQuery({
    queryKey: ["ai-parser-job-questions", jobId],
    queryFn: async () => {
      const { data } = await api.get<PaginatedParsedQuestions>(
        links.aiParser.jobQuestions(jobId!),
      );
      return data.results;
    },
    enabled: Boolean(jobId) && job?.status === "needs_review",
  });

  const { data: taxamonyTree } = useQuery({
    queryKey: ["taxamony-tree"],
    queryFn: async () => {
      const restaxa = await api.get<Taxamony[]>(links.subjects.taxonomyTree);
      return restaxa.data;
    },
  });

  useEffect(() => {
    if (job?.status === "failed") {
      setAiState("failed");
      toast.error(
        job.error_message || "AI test formatlashda xatolik yuz berdi.",
      );
    }
  }, [job?.status, job?.error_message]);

  useEffect(() => {
    if (parsedQuestions) {
      setQuestions(parsedQuestions.map(mapParsedQuestion));
      setAiState("review");
    }
  }, [parsedQuestions]);

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
      setJobId(data.id); // ← endi haqiqiy job ID saqlanadi, polling shu yerdan boshlanadi
    },
    onError: (error) => {
      toast.error(
        "Faylni yuklashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.",
      );
      console.error("Error uploading file:", error);
      setAiState("failed");
    },
  });

  const { mutate: manualCreate } = useMutation({
    mutationKey: ["examinations"],
    mutationFn: ({ data }: any) => api.post(links.exams.examinations, data),
    onSuccess: () => {
      toast.success("Muvaffaqiyatli yaratildi");
      refetch();
    },
    onError: (error) => {
      console.log("create exam: ", error);
      toast.error("Xatolik");
    },
  });

  const { mutate: aiPublish } = useMutation({
    mutationKey: ["pubish"],
    mutationFn: () => api.post(links.aiParser.jobPublish(jobId || "")),
    onSuccess: () => {
      toast.success("Test muvaffaqiyatli yaratildi!!!");
      resetAndClose();
      refetch();
    },
    onError: (error) => {
      console.log("ai publish: ", error);
      toast.error("Xatolik!!!");
    },
  });

  const { mutate: aiCreate } = useMutation({
    mutationKey: ["confirm-all"],
    mutationFn: ({ data, id }: any) =>
      api.post(links.aiParser.jobQuestionsConfirmAll(String(id)), data),
    onSuccess: () => {
      aiPublish();
    },
    onError: (error) => {
      console.log("create exam: ", error);
      toast.error("Testni tasdiqlashda hatolik");
    },
  });

  const { mutate: removeAiQuestion } = useMutation({
    mutationKey: ["questions"],
    mutationFn: ({ jobId, id }: { jobId: string; id: string }) =>
      api.delete(links.aiParser.jobQuestionDetail(jobId, id)),
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

  const removeQuestion = ({ id }: { id: string }) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
    if (tab === "ai" && jobId) {
      removeAiQuestion({ jobId, id }); // "1" o'rniga haqiqiy jobId
    }
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

const handleCreate = () => {
  validateAndSubmit();

  const subject =
    taxamonyTree && taxamonyTree.find((s) => s.id === meta.subjectId);

  const wrappedQuestions = questions.map((question) => {
    if (tab === "ai") return [question];
    const { id, ...rest } = question;
    return [rest];
  });

  const newTest = {
    ...(tab === "ai" ? { id: `test_${Date.now()}` } : {}),
    title: meta.title,
    subjectId: meta.subjectId,
    subjectName: subject?.title ?? "—",
    format: meta.format,
    questionsCount: questions.length,
    totalBall: questions.reduce((sum, q) => sum + q.ball, 0),
    durationMinutes: meta.durationMinutes,
    status: "Nashr qilingan",
    createdAt: new Date().toISOString(),
    createdVia: tab === "ai" ? "ai" : "manual",
    questions: wrappedQuestions,
  };

  if (tab === "ai") {
    aiCreate({ data: newTest, id: jobId });
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
