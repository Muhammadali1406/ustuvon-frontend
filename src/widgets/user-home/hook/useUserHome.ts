import { api } from "@/request/api";
import { links } from "@/request/links";
import { useQuery } from "@tanstack/react-query";

export function useUserHome() {
    const {} = useQuery({
        queryKey: ["user-home"],
        queryFn: () => api.get(links.auth.me),
    });
  return {};
}
