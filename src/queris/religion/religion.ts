import { authAxios } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

export const useReligionQuery = () => {
    return useQuery({
        queryKey: ["religions"],
        queryFn: async () => {
            const res = await authAxios.get("/religions")
            console.log('religions data in useRligionsQuery', res.data);
            return res.data
        },
    })
}