import { authAxios } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

type UsePaymentMethodQueryParams = {
    page?: number,
    page_size?: number;
    sort_by?: string;
    sort_type?: string;
    search?: string;
}
export const usePaymentMethodQuery = (params: UsePaymentMethodQueryParams) => {
    return useQuery({
      queryKey: ["paymentMethods", params],
      queryFn: async () => {
        const res = await authAxios.get("/settings/payment-methods", { params });
        console.log("PaymentMethod data in usePaymentMethodQuery", res.data);
        return res.data;
      },
    });
}