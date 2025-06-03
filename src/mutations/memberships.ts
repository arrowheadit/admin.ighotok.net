import { authAxios } from '@/lib/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { createMemberships,updateMemberships } from '@/types/memberships'

export const useCreateMembershipMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: async (membership: createMemberships) => {
        const formData = new FormData();
        if (membership.name != null) {
          formData.append("name", membership.name);
        }
        if (membership.image != null) {
          formData.append("image", membership.image); // File or string (if needed)
        }
        if (membership.description != null) {
          formData.append("description", membership.description);
        }
        if (membership.price != null) {
          formData.append("price", String(membership.price));
        }
        if (membership.proposals != null) {
          formData.append("proposals", String(membership.proposals));
        }
        if (membership.profile_views_limit != null) {
          formData.append(
            "profile_views_limit",
            String(membership.profile_views_limit)
          );
        }
        if (membership.days != null) {
          formData.append("days", String(membership.days));
        }
        if (membership.is_published != null) {
          formData.append("is_published", String(membership.is_published?1:0));
        }
        if (membership.is_recommended != null) {
          formData.append("is_recommended", String(membership.is_recommended?1:0));
        }

        return await authAxios.post("/memberships", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      },
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ["memberships"] });
      },
    });
} 

export const useUpdateMembershipMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: async (membership: updateMemberships) => {
        const formData = new FormData();
        formData.append("_method", "PUT");
        if (membership.id != null) {
          formData.append("id", String(membership.id));
        }
        if (membership.name != null) {
          formData.append("name", membership.name);
        }
        if (
          membership.image instanceof File && 
          membership.image.type.startsWith("image/") 
        ) {
          formData.append("image", membership.image);
        }
        if (membership.description != null) {
          formData.append("description", membership.description);
        }
        if (membership.price != null) {
          formData.append("price", String(membership.price));
        }
        if (membership.proposals != null) {
          formData.append("proposals", String(membership.proposals));
        }
        if (membership.profile_views_limit != null) {
          formData.append(
            "profile_views_limit",
            String(membership.profile_views_limit)
          );
        }
        if (membership.days != null) {
          formData.append("days", String(membership.days));
        }
        if (membership.is_published != null) {
          formData.append("is_published", String(membership.is_published?1:0));
        }
        if (membership.is_recommended != null) {
          formData.append("is_recommended", String(membership.is_recommended?1:0));
        }

        return await authAxios.post(`/memberships/${membership.slug}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      },
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ["memberships"] });
      },
    });
}

export const useDeleteMembershipMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (membershipId: string) => {
            return await authAxios.delete(`/memberships/${membershipId}`);
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ["memberships"] });
        }
    })
}