import { authAxios } from '@/lib/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
<<<<<<< HEAD
import type { CreatePageItem,UpdatePageItem,PageSectionContent } from '@/types/pages'
=======
import type { CreatePageItem,UpdatePageItem } from '@/types/pages'
>>>>>>> 8a3fd8b7b18b81dc57cd0b6b6d0cd47bc0580d98

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
<<<<<<< HEAD

export const useUpdatePageContentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      formContent,
      pageSlug,
    }: {
      formContent: PageSectionContent,
      pageSlug: string
    }) => {
      return await authAxios.put(`/settings/pages/${pageSlug}/content`, {
        content: formContent
      });
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["pages"] });
    },
  });
};
=======
>>>>>>> 8a3fd8b7b18b81dc57cd0b6b6d0cd47bc0580d98
