import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { api } from "@/request/api";
import { links } from "@/request/links";
import { toast } from "react-toastify";

// ---------------------------------------------------------------------------
// Backend sxemasiga mos (CategoriesCreate)
// ---------------------------------------------------------------------------

interface CreateCategoryPayload {
  title: string;
  author_first_name: string;
  author_last_name: string;
}

function extractServerError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as Record<string, unknown> | undefined;
    if (typeof data?.detail === "string") return data.detail;
    for (const field of ["title", "author_first_name", "author_last_name"]) {
      const value = data?.[field];
      if (Array.isArray(value) && value[0]) return String(value[0]);
    }
  }
  return "Kategoriya qo'shishda xatolik yuz berdi. Qaytadan urinib ko'ring.";
}

export function useCreateCategory(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: CreateCategoryPayload) =>
      api.post(links.subjects.categoryCreate, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subjects-taxonomy"] });
      toast.success("Yaratildi!");
      onSuccess?.();
    },
    onError: (error) => {
      console.log("crate category: ", error);
      toast.error("Xatolik!");
    },
  });

  return {
    createCategory: mutation.mutate,
    isCreating: mutation.isPending,
    error: mutation.isError ? extractServerError(mutation.error) : null,
    reset: mutation.reset,
  };
}
