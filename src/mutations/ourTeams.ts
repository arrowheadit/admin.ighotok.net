import { authAxios } from '@/lib/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { createOurTeams,updateOurTeams } from '@/types/our-teams'

export const useCreateOurTeamsMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: async (ourTeams: createOurTeams) => {
        const formData = new FormData();
        formData.append("name", ourTeams.name);
        formData.append("designation", ourTeams.designation);
        formData.append("image", ourTeams.image);
        return await authAxios.post("/our-teams", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        });
      },
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ["our-teams"] });
      },
    });
} 

export const useUpdateOurTeamsMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: async (ourTeams: updateOurTeams) => {
        const formData = new FormData();
         formData.append("_method", "PUT");
        formData.append("name", ourTeams.name);
        formData.append("designation", ourTeams.designation);
        formData.append("image", ourTeams.image);
        return await authAxios.post(`/our-teams/${ourTeams.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      },
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ["our-teams"] });
      },
    });
}

export const useDeleteOurTeamsMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (OurTeamsId: number) => {
            return await authAxios.delete(`/our-teams/${OurTeamsId}`);
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ["our-teams"] });
        }
    })
}