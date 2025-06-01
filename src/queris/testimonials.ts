import { authAxios } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

type UseTestimonialsQueryParams = {
    page?: number,
    page_size?: number;
    sort_by?: string;
    sort_type?: string;
    search?: string;
}
export const useTestimonialsQuery = (params: UseTestimonialsQueryParams) => {
    return useQuery({
      queryKey: ["testimonials", params],
      queryFn: async () => {
        const res = await authAxios.get("/testimonials", { params });
        console.log("Testimonials data in useTestimonialsQuery", res.data);
        return res.data;
      },
    });
}