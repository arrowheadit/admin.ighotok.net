import { authAxios } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

type UseMembershipsQueryParams = {
    page?: number,
    page_size?: number;
    sort_by?: string;
    sort_type?: string;
    search?: string;
}
export const useMembershipsQuery = (params: UseMembershipsQueryParams) => {
    return useQuery({
      queryKey: ["memberships", params],
      queryFn: async () => {
        const res = await authAxios.get("/memberships", { params });
        console.log("Memberships data in useMembershipsQuery", res.data);
        return res.data;
      },
    });
}