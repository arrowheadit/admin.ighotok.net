import { authAxios } from '@/lib/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { CreatePageItem,UpdatePageItem } from '@/types/pages'

export const useCreatePageMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ title,slug,content, status }:CreatePageItem) => {
            return await authAxios.post('/settings/pages', {
                title: title,                
                slug: slug,
                content: content,
                status: status,
                
            })
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['pages'] })
        }
    })
} 

export const useUpdatePageMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (page: UpdatePageItem) => {
            return await authAxios.put(`/settings/pages/${page.id}`, {
                title: page.title,                
                slug: page.slug,
                content: page.content,
                status: page.status,
            })
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['pages'] })
        }
    })
}

export const useDeletePageMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (pageId: number) => {
            return await authAxios.post(`/page-change-status`, {
                'page_id':pageId
            })
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['pages'] })
        }
    })
}