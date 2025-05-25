import { authAxios } from '@/lib/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { CreateDivisionItem,UpdateDivisionItem } from '@/types/geo-location'

export const useCreateDivisionMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ name, bn_name,url,is_active }:CreateDivisionItem) => {
            return await authAxios.post('/geo-divisions', {
                name: name,
                bn_name: bn_name,
                url: url,
                is_active:is_active
            })
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['divisions'] })
        }
    })
} 

export const useUpdateDivisionMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (area: UpdateDivisionItem) => {
            return await authAxios.put(`/geo-divisions/${area.id}`, {
                name: area.name,
                bn_name: area.bn_name,
                url: area.url,
                is_active:area.is_active
            })
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['divisions'] })
        }
    })
}

export const useDeleteDivisionMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (divisionId: number) => {
            return await authAxios.post(`/division-change-status`, {
                'division_id':divisionId
            })
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['divisions'] })
        }
    })
}