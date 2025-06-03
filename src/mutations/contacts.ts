import { authAxios } from '@/lib/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
export const useDeleteContactsMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (contactId: number) => {
            return await authAxios.delete(`/contact/${contactId}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["contacts"] });
        }
    })
}