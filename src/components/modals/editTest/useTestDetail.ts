import { useCallback, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { type Question } from "@/widgets/test/hook/test-types";
import type { TestDetail } from "./test-types";

import { links } from "@/request/links";
import { api } from "@/request/api";

export function useTestDetail() {
  const queryClient = useQueryClient();

  const [testId, setTestId] = useState<number | string | null>(null);

  // =========================
  // Get Test Detail
  // =========================

  const {
    data: test,
    isLoading,
    isFetching,
  } = useQuery<TestDetail>({
    queryKey: ["test-detail", testId],

    queryFn: async () => {
      if (!testId) {
        throw new Error("Test ID topilmadi");
      }

      const { data } = await api.get<TestDetail>(
        links.exams.examinationDetail(testId),
      );

      return data;
    },

    enabled: !!testId,
  });

  // =========================
  // Fetch Test Detail
  // =========================

  const fetchDetail = useCallback(
    async (id: number | string) => {
      setTestId(id);

      return queryClient.fetchQuery({
        queryKey: ["test-detail", id],

        queryFn: async () => {
          const { data } = await api.get<TestDetail>(
            links.exams.examinationDetail(id),
          );

          return data;
        },
      });
    },
    [queryClient],
  );

  // =========================
  // Update Test
  // =========================

  const updateTestMutation = useMutation({
    mutationKey: ["test-detail", "update"],

    mutationFn: async ({
      id,
      payload,
    }: {
      id: number | string;
      payload: Partial<TestDetail>;
    }) => {
      const { data } = await api.patch<TestDetail>(
        links.exams.examinationDetail(id),
        payload,
      );

      return data;
    },

    onSuccess: (updatedTest, variables) => {
      queryClient.setQueryData<TestDetail>(
        ["test-detail", variables.id],
        updatedTest,
      );
    },

    onError: (error) => {
      console.error("Test update error:", error);
    },
  });

  // =========================
  // Update Question
  // =========================

  const updateQuestionMutation = useMutation({
    mutationKey: ["test-detail", "update-question"],

    mutationFn: async ({
      id,
      payload,
    }: {
      id: number;
      payload: Partial<Question>;
    }) => {
      const { data } = await api.patch<Question>(
        links.exams.questionDetail(id),
        payload,
      );

      return data;
    },

    onSuccess: (updatedQuestion) => {
      queryClient.setQueryData<TestDetail>(
        ["test-detail", testId],
        (prev: any) => {
          if (!prev) return prev;

          return {
            ...prev,

            questions: prev.questions.map((question: any) =>
              String(question.id) === updatedQuestion.id
                ? updatedQuestion
                : question,
            ),
          };
        },
      );
    },

    onError: (error) => {
      console.error("Question update error:", error);
    },
  });

  // =========================
  // Delete Question
  // =========================

  const deleteQuestionMutation = useMutation({
    mutationKey: ["test-detail", "delete-question"],

    mutationFn: async (id: number) => {
      await api.delete(links.exams.questionDetail(id));

      return id;
    },

    onSuccess: (deletedQuestionId) => {
      queryClient.setQueryData<TestDetail>(["test-detail", testId], (prev) => {
        if (!prev) return prev;

        return {
          ...prev,

          questions: prev.questions.filter(
            (question) => question.id !== deletedQuestionId,
          ),
        };
      });
    },

    onError: (error) => {
      console.error("Question delete error:", error);
    },
  });

  // =========================
  // Public Methods
  // =========================

  const updateTest = useCallback(
    async (id: number | string, payload: Partial<TestDetail>) => {
      return updateTestMutation.mutateAsync({
        id,
        payload,
      });
    },
    [updateTestMutation],
  );

  const updateQuestion = useCallback(
    async (id: number, payload: Partial<Question>) => {
      return updateQuestionMutation.mutateAsync({
        id,
        payload,
      });
    },
    [updateQuestionMutation],
  );

  const deleteQuestion = useCallback(
    async (id: number) => {
      return deleteQuestionMutation.mutateAsync(id);
    },
    [deleteQuestionMutation],
  );

  return {
    // Test
    test: test ?? null,
    loading: isLoading || isFetching,

    // Requests
    fetchDetail,
    updateTest,
    updateQuestion,
    deleteQuestion,

    // Mutation states
    isUpdatingTest: updateTestMutation.isPending,
    isUpdatingQuestion: updateQuestionMutation.isPending,
    isDeletingQuestion: deleteQuestionMutation.isPending,
  };
}
