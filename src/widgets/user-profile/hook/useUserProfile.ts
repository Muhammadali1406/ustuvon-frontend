import { api } from "@/request/api";
import { links } from "@/request/links";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export function useUserProfile() {
  const { data: certificates } = useQuery({
    queryKey: ["certificte"],
    queryFn: () =>
      api.get(links.certificates.list),
    select: (data) => {
        return data.data
    },
  });
  useEffect(() => {
    console.log("user certificates: ", certificates);
  }, [certificates]);
  return { certificates };
}
