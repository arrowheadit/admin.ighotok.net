import { authAxios } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"
type UseQueryParams = {
    page?: number,
    page_size?: number;
    sort_by?: string;
    sort_type?: string;
    search?: string;
}
export const useCategoriesQuery = (params:UseQueryParams) => {
    return useQuery({
        queryKey: ["categories",params],
        queryFn: async () => {
            const res = await authAxios.get("/blog-categories",{params})
            return res.data
        },
    })
}