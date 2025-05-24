import { authAxios } from '@/lib/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { CreateUpazilaItem,UpdateUpazilaItem } from '@/types/geo-location'

export const useCreateUpazilaMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ name, district_id,bn_name,url,is_active }:CreateUpazilaItem) => {
            return await authAxios.post('/upazilas', {
                name: name,
                district_id: district_id,
                bn_name: bn_name,
                url: url,
                is_active:is_active
            })
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['upazilas'] })
        }
    })
} 

export const useUpdateUpazilaMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (upazila: UpdateUpazilaItem) => {
            return await authAxios.put(`/upazilas/${upazila.id}`, {
                name: upazila.name,
                district_id: upazila.district_id,
                bn_name: upazila.bn_name,
                url: upazila.url,
                is_active:upazila.is_active
            })
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['upazilas'] })
        }
    })
}

export const useDeleteUpazilaMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (upazilaId: number) => {
            return await authAxios.post(`/upazila-change-status`, {
                'upazila_id':upazilaId
            })
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['upazilas'] })
        }
    })
}