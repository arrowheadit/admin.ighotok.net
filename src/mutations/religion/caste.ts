import { authAxios } from '@/lib/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateCasteMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ casteName }:{casteName: string}) => {
            return await authAxios.post('/religion-castes', {
                name: casteName,
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
        mutationFn: async (caste: { id: number; name: string }) => {
            return await authAxios.put(`/religion-castes/${caste.id}`, {
                name: caste.name,
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