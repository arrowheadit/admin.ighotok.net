import { authAxios } from '@/lib/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { CreatePageItem,UpdatePageItem } from '@/types/pages'

export const useCreatePageMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ title,content, status }:CreatePageItem) => {
            return await authAxios.post('/settings/pages', {
                title: title, 
                content: Object.entries(content),
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
            return await authAxios.put(`/settings/pages/${page.slug}`, {
                id:page.id,
                title: page.title,
                content: Object.entries(page.content),
                status: page.status,
            })
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['pages'] })
        }
    })
}
export const useActiveDeActivePageMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (pageId: string) => {
            return await authAxios.patch(`/settings/pages/${pageId}/status`)
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
        mutationFn: async (pageId: string) => {
            return await authAxios.delete(`/settings/pages/${pageId}`)
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['pages'] })
        }
    })
}
