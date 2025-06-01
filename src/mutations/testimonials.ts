import { authAxios } from '@/lib/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { createTestimonials,updateTestimonials } from '@/types/testimonials'

export const useCreateTestimonialsMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: async (testimonials: createTestimonials) => {
        const formData = new FormData();
        formData.append("name", testimonials.name);
        formData.append("content", testimonials.content);
        formData.append("designation", testimonials.designation);
        formData.append("image", testimonials.image);
        formData.append("status", testimonials.status);
        return await authAxios.post("/testimonials", formData, {
          "headers": {
            "Content-Type":"multipart/form-data"
          }
        });
      },
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      },
    });
} 

export const useUpdateTestimonialsMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: async (testimonials: updateTestimonials) => {
        const formData = new FormData();
        formData.append("_method", "PUT");
        formData.append("name", testimonials.name);
        formData.append("content", testimonials.content);
        formData.append("designation", testimonials.designation);
        formData.append("image", testimonials.image);
        formData.append("status", testimonials.status);
        return await authAxios.post(`/testimonials/${testimonials.id}`, formData, {
          headers: {
            "Content-Type":"multipart/form-data"
          }
        });
      },
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      },
    });
}

export const useDeleteTestimonialsMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (TestimonialsId: number) => {
            return await authAxios.delete(`/testimonials/${TestimonialsId}`)
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['testimonials'] })
        }
    })
}