import { authAxios } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"
type UseQueryParams = {
    page?: number,
    page_size?: number;
    sort_by?: string;
    sort_type?: string;
    search?: string;
}
export const useTagListQuery = (params:UseQueryParams) => {
    return useQuery({
        queryKey: ["tags",params],
        queryFn: async () => {
            const res = await authAxios.get("/tags", {
                params
            })
            return res.data
        },
    })
}