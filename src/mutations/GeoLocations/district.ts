import { authAxios } from '@/lib/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { CreateDistrictItem,UpdateDistrictItem } from '@/types/geo-location'

export const useCreateDistrictMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ name, division_id,bn_name,lat,lon,url,is_active }:CreateDistrictItem) => {
            return await authAxios.post('/districts', {
                name: name,
                division_id: division_id,
                bn_name: bn_name,
                lat: lat,
                lon: lon,
                url: url,
                is_active:is_active
            })
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['districts'] })
        }
    })
} 

export const useUpdateDistrictMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (district: UpdateDistrictItem) => {
            return await authAxios.put(`/districts/${district.id}`, {
                name: district.name,
                division_id: district.division_id,
                bn_name: district.bn_name,
                lat: district.lat,
                lon: district.lon,
                url: district.url,
                is_active:district.is_active
            })
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['districts'] })
        }
    })
}

export const useDeleteDistrictMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (districtId: number) => {
            return await authAxios.post(`/district-change-status`, {
                'district_id':districtId
            })
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['districts'] })
        }
    })
}