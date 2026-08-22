import { api } from "@/request/api";
import { links } from "@/request/links";
import { useQuery } from "@tanstack/react-query";

export function useSubject() {
  const { data: subjects } = useQuery({
    queryKey: ["taxanomy-tree"],
    queryFn: () => api.get(links.subjects.taxonomyTree),
    select: (data) => data.data,
  });
  console.log("subjects: ", subjects);
  return { subjects };
}
