import { authAxios } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

type UseDivisionQueryParams = {
    page?: number,
    page_size?: number;
    sort_by?: string;
    sort_type?: string;
    search?: string;
}
export const useDivisionQuery = (params: UseDivisionQueryParams) => {
    return useQuery({
        queryKey: ["divisions", params],
        queryFn: async () => {
            const res = await authAxios.get("/geo-divisions", { params });
            return res.data
        },
    })
}