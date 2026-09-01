import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/request/api";
import { links } from "@/request/links";
import { toast } from "react-toastify";
import type { ApiUser, PaginatedUsers } from "./types-users";

export const useUser = () => {
  const queryClient = useQueryClient();

  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await api.get<PaginatedUsers>(links.adminPanel.users);
      return data.results; // paginatsiya qatlamidan haqiqiy ro'yxatni chiqaramiz
    },
  });

  const { mutate: toggleActive, isPending: isToggling } = useMutation({
    mutationKey: ["users", "toggle-active"],
    mutationFn: ({ id, is_active }: { id: string; is_active: boolean }) =>
      api.patch(links.adminPanel.userDetail(id), { is_active }),
    onSuccess: () => {
      toast.success("Bajarildi!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error("user update error:", error);
      toast.error("Xatolik yuz berdi");
    },
  });

  const handleToggleActive = (user: ApiUser) => {
    toggleActive({ id: user.id, is_active: !user.is_active });
  };

  return {
    allUsers: users ?? [],
    isLoading,
    handleToggleActive,
    isToggling,
  };
};