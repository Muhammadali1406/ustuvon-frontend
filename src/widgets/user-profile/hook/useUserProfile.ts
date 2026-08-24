import { api } from "@/request/api";
import { links } from "@/request/links";
import { RESULT_HISTORY } from "@/widgets/user-result/hook/user-result-data";
import { useQuery } from "@tanstack/react-query";

export function useUserProfile() {
  const { data: certificates } = useQuery({
    queryKey: ["certificte"],
    queryFn: () => api.get(links.certificates.list),
    select: (data) => {
      console.log(data.data);
      return data.data;
    },
  });
  return { certificates: certificates || RESULT_HISTORY };
}
