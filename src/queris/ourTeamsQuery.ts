import { authAxios } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

type UseOurTeamsQueryParams = {
    page?: number,
    page_size?: number;
    sort_by?: string;
    sort_type?: string;
    search?: string;
}
export const useOurTeamsQuery = (params: UseOurTeamsQueryParams) => {
    return useQuery({
      queryKey: ["our-teams", params],
      queryFn: async () => {
        const res = await authAxios.get("/our-teams", { params });
        console.log("Our Teams data in useOurTeamsQuery", res.data);
        return res.data;
      },
    });
}