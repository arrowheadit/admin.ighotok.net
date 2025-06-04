import { authAxios } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

type UseLifeStoriesQueryParams = {
    page?: number,
    page_size?: number;
    sort_by?: string;
    sort_type?: string;
    search?: string;
}
export const useLifeStoriesQuery = (params: UseLifeStoriesQueryParams) => {
    return useQuery({
      queryKey: ["lifeStories", params],
      queryFn: async () => {
        const res = await authAxios.get("/life-stories", { params });
        console.log("Life Stories data in useLifeStoriesQuery", res.data);
        return res.data;
      },
    });
}