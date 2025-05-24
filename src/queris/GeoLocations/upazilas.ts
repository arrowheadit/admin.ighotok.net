import { authAxios } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

type QueryParams = {
    page?: number,
    page_size?: number;
    sort_by?: string;
    sort_type?: string;
    search?: string;
}
export const useUpazilaQuery = (params: QueryParams) => {
    return useQuery({
        queryKey: ["upazilas", params],
        queryFn: async () => {
            const res = await authAxios.get("/upazilas", { params });
            console.log('Upazila data in useUpazilaQuery', res.data);
            return res.data
        },
    })
}