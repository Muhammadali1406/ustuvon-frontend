import { api } from "@/request/api";
import { links } from "@/request/links";
import { useQuery } from "@tanstack/react-query";

export function useDashboard() {
  const {
    data: dashboard,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => api.get(links.adminPanel.dashboard),
    select: (data) => data.data,
  });
  return { dashboard, isLoading, isError };
}
