import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query';

export const useDestroyInitiative = () => {
  const queryClient = useQueryClient();

  const result = useMutation({
    mutationFn: (id: string) => {
      return fetch(`http://localhost:3000/initiative/${id}`, {
        method: 'DELETE'
      }).then((response) => response.json())
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['initiativeData'] });
    },
  });

  return result;
};
