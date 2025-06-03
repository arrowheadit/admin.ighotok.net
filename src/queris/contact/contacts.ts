import { authAxios } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

type UseContactsQueryParams = {
    page?: number,
    page_size?: number;
    sort_by?: string;
    sort_type?: string;
    search?: string;
}
export const useContactsQuery = (params: UseContactsQueryParams) => {
    return useQuery({
        queryKey: ["contacts", params],
        queryFn: async () => {
            const res = await authAxios.get("/contact", { params });
            return res.data
        },
    })
}