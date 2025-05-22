import { authAxios } from '@/lib/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { CreateAreaItem,UpdateAreaItem } from '@/types/geo-location'

export const useCreateAreaMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ name, upazila_id,bn_name,url,is_active }:CreateAreaItem) => {
            return await authAxios.post('/areas', {
                name: name,
                upazila_id: upazila_id,
                bn_name: bn_name,
                url: url,
                is_active:is_active
            })
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['areas'] })
        }
    })
} 

export const useUpdateAreaMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (area: UpdateAreaItem) => {
            return await authAxios.put(`/areas/${area.id}`, {
                name: area.name,
                upazila_id: area.upazila_id,
                bn_name: area.bn_name,
                url: area.url,
                is_active:area.is_active
            })
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['areas'] })
        }
    })
}

export const useDeleteAreaMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (areaId: number) => {
            return await authAxios.post(`/area-change-status`, {
                'area_id':areaId
            })
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['areas'] })
        }
    })
}