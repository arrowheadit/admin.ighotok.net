import { authAxios } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

type UseAreaQueryParams = {
    page?: number,
    page_size?: number;
    sort_by?: string;
    sort_type?: string;
    search?: string;
}
export const useAreaQuery = (params: UseAreaQueryParams) => {
    return useQuery({
        queryKey: ["areas", params],
        queryFn: async () => {
            const res = await authAxios.get("/areas", { params });
            console.log('Area data in useAreaQuery', res.data);
            return res.data
        },
    })
}