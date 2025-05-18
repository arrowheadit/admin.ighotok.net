import { authAxios } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

type UseEducationQueryParams = {
    page?: number,
    page_size?: number;
    sort_by?: string;
    sort_type?: string;
    search?: string;
}
export const useEducationQuery = (params: UseEducationQueryParams) => {
    return useQuery({
        queryKey: ["educations", params],
        queryFn: async () => {
            const res = await authAxios.get("/education", { params });
            console.log('educations data in useEducationQuery', res.data);
            return res.data
        },
    })
}