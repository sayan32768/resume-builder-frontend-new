import { useInfiniteQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/api/axios";

/* ---------------- PUBLISHED RESUMES ---------------- */
export const usePublishedResumes = () =>
  useInfiniteQuery({
    queryKey: ["resumes", "published"],

    queryFn: async ({ pageParam = 1 }) => {
      console.log("Fetching published resumes, page:", pageParam);
      const res = await api.get(
        `/api/resume/all?type=published&page=${pageParam}`,
      );

      return res.data.data; // paginator
    },

    getNextPageParam: (lastPage) => {
      if (!lastPage.next_page_url) return undefined;
      return lastPage.current_page + 1;
    },

    staleTime: 5 * 60 * 60 * 1000,
  });

/* ---------------- DRAFT RESUMES ---------------- */
export const useDraftResumes = (enabled) =>
  useInfiniteQuery({
    queryKey: ["resumes", "drafts"],

    queryFn: async ({ pageParam = 1 }) => {
      const res = await api.get(
        `/api/resume/all?type=drafts&page=${pageParam}`,
      );

      return res.data.data;
    },

    getNextPageParam: (lastPage) => {
      if (!lastPage.next_page_url) return undefined;
      return lastPage.current_page + 1;
    },

    enabled, // 👈 only fetch when tab active
    staleTime: 5 * 60 * 60 * 1000,
    refetchOnMount: "always", // ⭐ IMPORTANT
  });

export const useDeleteResume = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const res = await api.delete(`/api/resume/${id}`);
      return res.data;
    },

    // ⭐ update UI ONLY after successful delete
    onSuccess: (_data, id) => {
      const removeFromPages = (old) => {
        if (!old) return old;

        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            data: page.data.filter((r) => r._id !== id),
          })),
        };
      };

      queryClient.setQueryData(["resumes", "published"], removeFromPages);
      queryClient.setQueryData(["resumes", "drafts"], removeFromPages);

      // optional: background sync
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
    },
  });
};
