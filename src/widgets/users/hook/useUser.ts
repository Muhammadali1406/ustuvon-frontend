import { useEffect, useState } from "react";
import { buildUsers } from "./utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/request/api";
import { links } from "@/request/links";
import { toast } from "react-toastify";

export const useUser = () => {
  const [allUsers, setAllUsers] = useState(buildUsers);
  
  const {mutate:userUpdate} = useMutation({
    mutationKey:[""],
    mutationFn:(id:string)=>api.patch(links.adminPanel.userDetail(id)),
    onSuccess:()=>{
        toast.success("Bajarildi!")
    },
    onError:(error)=>{
        console.log("user update error: ", error)
        toast.error("Xatolik")
    }
  })

  const { data } = useQuery({
    queryKey: [""],
    queryFn: () => api.get<any>(links.adminPanel.users),
    select: (data: any) => {
      return data;
    },
  });

  useEffect(() => {
    setAllUsers(data ?? buildUsers);
  }, [data]);
  return { allUsers , userUpdate };
};
