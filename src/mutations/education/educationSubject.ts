import { authAxios } from '@/lib/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateEducationSubjectMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ name, education_id }:{name: string, education_id: number}) => {
            return await authAxios.post('/education-subjects', {
                name: name,
                education_id: education_id
            })
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['educationSubjects'] })
        }
    })
} 

export const useUpdateEducationSubjectMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (educationSubject: { id: number; name: string;education_id: number }) => {
            return await authAxios.put(`/education-subjects/${educationSubject.id}`, {
                name: educationSubject.name,
                education_id: educationSubject.education_id,
            })
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['educationSubjects'] })
        }
    })
}

export const useDeleteEducationSubjectMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (educationId: number) => {
            return await authAxios.delete(`/education-subjects/${educationId}`)
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['educationSubjects'] })
        }
    })
}