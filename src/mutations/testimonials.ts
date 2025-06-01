import { authAxios } from '@/lib/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { createTestimonials,updateTestimonials } from '@/types/testimonials'

export const useCreateTestimonialsMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: async (testimonials: createTestimonials) => {
        return await authAxios.post("/testimonials", {
          name: testimonials.name,
          image: testimonials.image,
          content: testimonials.content,
          designation: testimonials.designation,
          status: testimonials.status,
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
        return await authAxios.put(`/testimonials/${testimonials.id}`, {
          name: testimonials.name,
          image: testimonials.image,
          content: testimonials.content,
          designation: testimonials.designation,
          status: testimonials.status,
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