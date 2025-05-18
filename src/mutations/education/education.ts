import { authAxios } from '@/lib/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateEducationMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ degree }:{degree: string}) => {
            return await authAxios.post('/education', {
                degree: degree,
            })
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['educations'] })
        }
    })
} 

export const useUpdateEducationMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (education: { id: number; degree: string }) => {
            return await authAxios.put(`/education/${education.id}`, {
                degree: education.degree,
            })
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['educations'] })
        }
    })
}

export const useDeleteEducationMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (educationId: number) => {
            return await authAxios.delete(`/education/${educationId}`)
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['educations'] })
        }
    })
}