import { authAxios } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

type UseProfessionQueryParams = {
    page?: number,
    page_size?: number;
    sort_by?: string;
    sort_type?: string;
    search?: string;
}
export const useProfessionQuery = (params: UseProfessionQueryParams) => {
    return useQuery({
        queryKey: ["professions", params],
        queryFn: async () => {
            const res = await authAxios.get("/professions", { params });
            console.log('Professions data in useProfessionQuery', res.data);
            return res.data
        },
    })
}