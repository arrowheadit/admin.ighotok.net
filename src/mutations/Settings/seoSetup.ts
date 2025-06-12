import { authAxios } from '@/lib/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { createPageSeo } from '@/types/seo'

export const useCreateSeoSetupMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: async ({
        title,
        image,
        description,
        canonical_url,
        author,
        keywords,
        pageSlug,
      }: createPageSeo) => {
            const formData = new FormData();
        if (title != null) {
            formData.append("title", title);      
        }
        // if (image != null && image instanceof File) {
        //   formData.append("image", image);
            // }
            if (image != null && (typeof image === 'string' || image instanceof File)) {
              formData.append("image", image);
            }
        if (description != null) {
          formData.append("description", description);
        }
        if (canonical_url != null) {
          formData.append("canonical_url", canonical_url);
        }
        if (author != null) {
          formData.append("author", author);
        }
        if (keywords != null) {
          formData.append("keywords", keywords);
        }
        if (pageSlug != null) {
          formData.append("pageSlug", pageSlug);
        }
        return await authAxios.post(`/settings/pages/${pageSlug}/seo`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      },
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ["pages"] });
      },
    });
} 
