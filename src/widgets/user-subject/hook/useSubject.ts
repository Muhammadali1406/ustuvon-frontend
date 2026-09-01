import { useQuery } from "@tanstack/react-query";
import { api } from "@/request/api";
import { links } from "@/request/links";
import type { Category } from "./subject-types";

export function useSubject() {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["taxanomy-tree"],
    queryFn: async () => {
      const { data } = await api.get<Category[]>(links.subjects.taxonomyTree);
      return data;
    },
  });

  return { categories: categories ?? [], isLoading };
}