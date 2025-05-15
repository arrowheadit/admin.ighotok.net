import { authAxios } from '@/lib/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateReligionMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ religionsName }:{religionsName: string}) => {
            return await authAxios.post('/religions', {
                name: religionsName,
            })
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['religions'] })
        }
    })
} 

export const useUpdateReligionMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (religion: { id: number; name: string }) => {
            return await authAxios.put(`/religions/${religion.id}`, {
                name: religion.name,
            })
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['religions'] })
        }
    })
}

export const useDeleteReligionMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (religionId: number) => {
            return await authAxios.delete(`/religions/${religionId}`)
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['religions'] })
        }
    })
}