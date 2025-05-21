import { authAxios } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

type UseFaqsQueryParams = {
    page?: number,
    page_size?: number;
    sort_by?: string;
    sort_type?: string;
    search?: string;
}
export const useFaqsQuery = (params: UseFaqsQueryParams) => {
    return useQuery({
        queryKey: ["faqs", params],
        queryFn: async () => {
            const res = await authAxios.get("/faqs", { params });
            console.log('Faqs data in useFaqsQuery', res.data);
            return res.data
        },
    })
}