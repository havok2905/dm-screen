import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query';

export const useDestroyAdventureItem = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  const result = useMutation({
    mutationFn: (id: string) => {
      return fetch(`http://localhost:3000/adventureItems/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      }).then((response) => response.json())
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adventureData', 'adventuresData', 'adventureItemData', 'adventureItemsData'] });

      if (onSuccess) {
        onSuccess();
      }
    },
  });

  return result;
};
