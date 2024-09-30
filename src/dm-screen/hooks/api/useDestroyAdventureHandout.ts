import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query';

export const useDestroyAdventureHandout = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  const result = useMutation({
    mutationFn: (id: string) => {
      return fetch(`http://localhost:3000/adventureHandouts/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      }).then((response) => response.json())
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adventureData', 'adventuresData', 'adventureHandoutData', 'adventureHandoutsData'] });

      if (onSuccess) {
        onSuccess();
      }
    },
  });

  return result;
};
