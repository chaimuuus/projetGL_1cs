import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // Data remains fresh for 5 minutes
      cacheTime: 10 * 60 * 1000, // Cache persists for 10 minutes
      retry: 1, // Retry failed requests once
      refetchOnWindowFocus: true, // Refetch data when the window regains focus
    },
  },
});

export default queryClient;