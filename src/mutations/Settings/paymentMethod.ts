import { authAxios } from '@/lib/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { createPaymentMethod, updatePaymentMethod } from '@/types/payment-method'

export const useCreatePaymentMethodMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: async (paymentMethod: createPaymentMethod) => {
        const formData = new FormData();
        if (paymentMethod.name != null) {
          formData.append("name", paymentMethod.name);
        }
        if (paymentMethod.image != null) {
          formData.append("image", paymentMethod.image); // File or string (if needed)
        }
        if (paymentMethod.min != null) {
          formData.append("min", String(paymentMethod.min));
        }
        if (paymentMethod.max != null) {
          formData.append("max", String(paymentMethod.max));
        }
        if (paymentMethod.percent_charge != null) {
          formData.append("percent_charge", String(paymentMethod.percent_charge));
        }
        if (paymentMethod.fixed_charge != null) {
          formData.append("fixed_charge", String(paymentMethod.fixed_charge));
        }
       
      //  if (paymentMethod.meta != null) {
      //    formData.append("meta", String(paymentMethod.meta));
      //  }
        if (paymentMethod.status != null) {
          formData.append("status", String(paymentMethod.status));
        }

        
        return await authAxios.post("/settings/payment-methods", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      },
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ["paymentMethods"] });
      },
    });
} 

export const useUpdatePaymentMethodMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: async (paymentMethod: updatePaymentMethod) => {
        const formData = new FormData();
        formData.append("_method", "PUT");
        if (paymentMethod.name != null) {
          formData.append("name", paymentMethod.name);
        }
        if (
          paymentMethod.image != null &&
          paymentMethod.image instanceof File && paymentMethod.image.type.startsWith("image/")
        ) {
          formData.append("image", paymentMethod.image); 
        }
        if (paymentMethod.min != null) {
          formData.append("min", String(paymentMethod.min));
        }
        if (paymentMethod.max != null) {
          formData.append("max", String(paymentMethod.max));
        }
        if (paymentMethod.percent_charge != null) {
          formData.append(
            "percent_charge",
            String(paymentMethod.percent_charge)
          );
        }
        if (paymentMethod.fixed_charge != null) {
          formData.append("fixed_charge", String(paymentMethod.fixed_charge));
        }

         if (paymentMethod.meta != null) {
           formData.append("meta", JSON.stringify(paymentMethod.meta));
         }
        if (paymentMethod.status != null) {
          formData.append("status", String(paymentMethod.status));
        }
console.log("Payment Method Data in useUpdatePaymentMethodMutation", formData);
        return await authAxios.post(
          `/settings/payment-methods/${paymentMethod.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      },
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ["paymentMethods"] });
      },
    });
}

export const useDeletePaymentMethodMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (paymentMethodId: number) => {
            return await authAxios.delete(
              `/settings/payment-methods/${paymentMethodId}`
            );
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ["paymentMethods"] });
        }
    })
}