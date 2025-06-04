import { authAxios } from '@/lib/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { createLifeStory,updateLifeStory } from '@/types/lifeStory'

export const useCreateLifeStoryMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: async (lifeStory: createLifeStory) => {
        const formData = new FormData();
        formData.append("name", lifeStory.name);
        formData.append("description", lifeStory.description);
        formData.append("image_alt", lifeStory.image_alt);
        formData.append("image", lifeStory.image);
        formData.append("status", lifeStory.status);
        return await authAxios.post("/life-stories", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      },
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ["lifeStories"] });
      },
    });
} 

export const useUpdateLifeStoryMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: async (lifeStory: updateLifeStory) => {
        const formData = new FormData();
        formData.append("_method", "PUT");
        if (lifeStory.name != null) {
          formData.append("name", lifeStory.name);
        }
        if (lifeStory.description != null) {
          formData.append("description", lifeStory.description);
        }
        if (lifeStory.image_alt != null) {
          formData.append("image_alt", lifeStory.image_alt);
        }
        if (lifeStory.image instanceof File && lifeStory.image.type.startsWith("image/")) {
            formData.append("image", lifeStory.image);
        } 
        if (lifeStory.status != null) {
          formData.append("status", lifeStory.status);
        } 
        return await authAxios.post(`/life-stories/${lifeStory.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      },
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ["lifeStories"] });
      },
    });
}

export const useDeleteLifeStoryMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (LifeStoryId: number) => {
            return await authAxios.delete(`/life-stories/${LifeStoryId}`);
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ["lifeStories"] });
        }
    })
}