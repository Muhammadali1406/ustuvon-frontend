import { api } from "@/request/api"
import { links } from "@/request/links"
import { useQuery } from "@tanstack/react-query"

export function useDashboard(){
    const {data:dashboard,isLoading,isError} = useQuery({
        queryKey:["dashboard"],
        queryFn: ()=>api.get(links.adminPanel.dashboard)
    })
    return {dashboard,isLoading,isError}
}