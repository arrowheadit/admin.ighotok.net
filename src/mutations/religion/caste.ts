import { authAxios } from '@/lib/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateCasteMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ casteName,religion_id}:{casteName: string,religion_id: number}) => {
            return await authAxios.post('/religion-castes', {
                name: casteName,
                religion_id
            })
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['castes'] })
        }
    })
} 

export const useUpdateCasteMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (caste: { id: number; name: string; religion_id: number }) => {
            return await authAxios.put(`/religion-castes/${caste.id}`, {
                name: caste.name,
                religion_id: caste.religion_id
            })
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['castes'] })
        }
    })
}

export const useDeleteCasteMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (casteId: number) => {
            return await authAxios.delete(`/religion-castes/${casteId}`)
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['castes'] })
        }
    })
}