import { authAxios } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

type UseEducationSubjectQueryParams = {
    page?: number,
    page_size?: number;
    sort_by?: string;
    sort_type?: string;
    search?: string;
}
export const useEducationSubjectQuery = (params: UseEducationSubjectQueryParams) => {
    return useQuery({
        queryKey: ["educationSubjects", params],
        queryFn: async () => {
            const res = await authAxios.get("/education-subjects", { params });
            console.log('education subjects data in useEducationSubjectQuery', res.data);
            return res.data
        },
    })
}