import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query';

export const useDestroyAdventure = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  const result = useMutation({
    mutationFn: (id: string) => {
      return fetch(`http://localhost:3000/adventures/${id}`, {
        method: 'DELETE'
      }).then((response) => response.json())
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adventureData', 'adventuresData'] });

      if (onSuccess) {
        onSuccess();
      }
    },
  });

  return result;
};
