import { authAxios } from "@/lib/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCreateBlogTagMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ name, status }:{name: string, status: boolean}) => {
            return await authAxios.post('/tags', {
                name: name,
                status: status ? 'active' : 'inactive',
            })
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['tags'] })
        }
    })
}

export const useUpdateBlogTagMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (tag: { id: number; name: string, status: boolean }) => {
            return await authAxios.put(`/tags/${tag.id}`, {
                name: tag.name,
                status: tag.status ? 'active' : 'inactive',
            })
        },
        onSuccess: ({ data }) => {
            console.log("data", data);
            
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['tags'] })
        }
    })
}

export const useDeleteBlogTagMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (tagId: number) => {
            return await authAxios.delete(`/tags/${tagId}`)
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['tags'] })
        }
    })
}