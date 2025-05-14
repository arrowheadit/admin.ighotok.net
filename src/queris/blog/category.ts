import { authAxios } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

export const useCategoriesQuery = () => {
    return useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const res = await authAxios.get("/blog-categories")
            return res.data
        },
    })
}