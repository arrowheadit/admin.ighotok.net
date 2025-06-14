import { authAxios } from '@/lib/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { createNotifications,updateNotifications } from "@/types/notifications";

export const useCreateNotificationMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (notification:createNotifications) => {
            return await authAxios.post('/settings/notification-templates', {
                name: notification.name,
                subject: notification.subject,
                body: notification.body,    
                channel: notification.channel,
                status: notification.status,
            })
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
        }
    })
} 

export const useUpdateNotificationMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (notification: updateNotifications) => {
            return await authAxios.put(
              `/settings/notification-templates/${notification.id}`,
              {
                id: notification.id,
                name: notification.name,
                subject: notification.subject,
                body: notification.body,
                channel: notification.channel,
                status: notification.status,
              }
            );
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
        }
    })
}

export const useDeleteNotificationMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (notificationId: number) => {
            return await authAxios.delete(
              `/settings/notification-templates/${notificationId}`
            );
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ["notifications"] })
        }
    })
}