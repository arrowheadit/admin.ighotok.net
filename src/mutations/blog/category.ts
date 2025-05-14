import { authAxios } from '@/lib/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateBlogCategoryMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ categoryName, status }:{categoryName: string, status: boolean}) => {
            return await authAxios.post('/blog-categories', {
                name: categoryName,
                status: status ? 'active' : 'inactive',
            })
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['categories'] })
        }
    })
} 

export const useUpdateBlogCategoryMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (category: { id: number; name: string, status: boolean }) => {
            return await authAxios.put(`/blog-categories/${category.id}`, {
                name: category.name,
                status: category.status ? 'active' : 'inactive',
            })
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['categories'] })
        }
    })
}

export const useDeleteBlogCategoryMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (categoryId: number) => {
            return await authAxios.delete(`/blog-categories/${categoryId}`)
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['categories'] })
        }
    })
}