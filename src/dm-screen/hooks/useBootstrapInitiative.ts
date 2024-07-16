import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query';

export const useBootstrapInitiative = () => {
  const queryClient = useQueryClient();

  const result = useMutation({
    mutationFn: (id: string) => {
      return fetch(`http://localhost:3000/initiative/${id}`, {
        method: 'POST'
      }).then((response) => response.json())
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['initiativeData'] });
    },
  });

  return result;
};
