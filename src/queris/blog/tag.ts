import { authAxios } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

export const useTagListQuery = () => {
    return useQuery({
        queryKey: ["tags"],
        queryFn: async () => {
            const res = await authAxios.get("/tags")
            return res.data
        },
    })
}