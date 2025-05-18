import { authAxios } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

type UseReligionQueryParams = {
    page?: number,
    page_size?: number;
    sort_by?: string;
    sort_type?: string;
    search?: string;
}
export const useReligionQuery = (params: UseReligionQueryParams) => {
    return useQuery({
        queryKey: ["religions", params],
        queryFn: async () => {
            const res = await authAxios.get("/religions", { params });
            console.log('religions data in useRligionsQuery', res.data);
            return res.data
        },
    })
}