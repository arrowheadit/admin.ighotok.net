import { authAxios } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

type QueryParams = {
    page?: number,
    page_size?: number;
    sort_by?: string;
    sort_type?: string;
    search?: string;
}
export const useDistrictsQuery = (params: QueryParams) => {
    return useQuery({
        queryKey: ["districts", params],
        queryFn: async () => {
            const res = await authAxios.get("/districts", { params });
            console.log('District data in useDistrictQuery', res.data);
            return res.data
        },
    })
}