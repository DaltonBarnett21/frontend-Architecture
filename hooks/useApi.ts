import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface MutationProps {
  mutationKey?: string[];
  mutationFn: any;
  onSuccess?: any;
  onError?: any;
}

interface QueryProps {
  queryKey?: string[];
  queryFn: any;
  onSuccess?: any;
  onError?: any;
}

function useApi() {
  const queryClient = useQueryClient();

  function query<TResponse, TError>({
    queryKey,
    queryFn,
    onSuccess,
    onError,
  }: QueryProps) {
    return useQuery<TResponse, TError>({
      queryKey: queryKey,
      queryFn: queryFn,
      onSuccess: onSuccess,
      onError: onError,
    });
  }

  function mutation<TResponse, TError, TVariable>({
    mutationKey,
    mutationFn,
    onSuccess,
  }: MutationProps) {
    return useMutation<TResponse, TError, TVariable>({
      mutationKey: mutationKey,
      mutationFn: mutationFn,
      onSuccess: onSuccess,
    });
  }

  return { query, mutation };
}

export default useApi;
