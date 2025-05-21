import { authAxios } from '@/lib/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

type faqsAddType = {
    question: string,
    answer: string,
    status: boolean
}
type faqsEditType = {
    id:number,
    question: string,
    answer: string,
    status:boolean
}
export const useCreateFaqsMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (faqs:faqsAddType) => {
            return await authAxios.post('/faqs', {
                question: faqs.question,
                answer: faqs.answer,
                status: faqs.status,
            })
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['faqs'] })
        }
    })
} 

export const useUpdateFaqsMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (faqs: faqsEditType) => {
            return await authAxios.put(`/faqs/${faqs.id}`, {
                question: faqs.question,
                answer: faqs.answer,
                status: faqs.status,
            })
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['faqs'] })
        }
    })
}

export const useDeleteFaqsMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (FaqsId: number) => {
            return await authAxios.delete(`/faqs/${FaqsId}`)
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['faqs'] })
        }
    })
}