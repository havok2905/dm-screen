import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query';

export const useDestroyMagicItem = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  const result = useMutation({
    mutationFn: (id: string) => {
      return fetch(`http://localhost:3000/magicItem/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      }).then((response) => response.json())
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['magicItemsData'] });

      if (onSuccess) {
        onSuccess();
      }
    },
  });

  return result;
};
