import { authAxios } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

type UseNotificationsQueryParams = {
    page?: number,
    page_size?: number;
    sort_by?: string;
    sort_type?: string;
    search?: string;
}
export const useNotificationsQuery = (params: UseNotificationsQueryParams) => {
    return useQuery({
        queryKey: ["notifications", params],
        queryFn: async () => {
            const res = await authAxios.get("/settings/notification-templates", {
              params,
            });
            console.log('Notifications data in useNotificationsQuery', res.data);
            return res.data
        },
    })
}