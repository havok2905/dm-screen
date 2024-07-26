import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query';

export const useDestroyInitiative = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  const result = useMutation({
    mutationFn: (id: string) => {
      return fetch(`http://localhost:3000/initiative/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      }).then((response) => response.json())
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['initiativeData'] });

      if (onSuccess) {
        onSuccess();
      }
    },
  });

  return result;
};
