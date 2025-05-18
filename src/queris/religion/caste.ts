import { authAxios } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

type UseCasteQueryParams = {
    page?: number,
    page_size?: number;
    sort_by?: string;
    sort_type?: string;
    search?: string;
}
export const useCasteQuery = (params: UseCasteQueryParams) => {
    return useQuery({
        queryKey: ["castes", params],
        queryFn: async () => {
            const res = await authAxios.get("/religion-castes", { params });
            console.log('castes data in useCasteQuery', res.data);
            return res.data
        },
    })
}