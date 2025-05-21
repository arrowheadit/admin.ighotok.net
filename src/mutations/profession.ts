import { authAxios } from '@/lib/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateProfessionMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ name }:{name: string}) => {
            return await authAxios.post('/professions', {
                name: name,
            })
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['professions'] })
        }
    })
} 

export const useUpdateProfessionMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (profession: { id: number; name: string }) => {
            return await authAxios.put(`/professions/${profession.id}`, {
                name: profession.name,
            })
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['professions'] })
        }
    })
}

export const useDeleteProfessionMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (professionId: number) => {
            return await authAxios.delete(`/professions/${professionId}`)
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['professions'] })
        }
    })
}