import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query';

export const useAddMagicItem = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  const result = useMutation({
    mutationFn: ({
      id,
      itemId
    }: {
      id: string;
      itemId: string;
    }) => {
      return fetch(`http://localhost:3000/adventure/${id}/addMagicItem/${itemId}`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then((response) => response.json())
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['adventureData', 'adventuresData']
      });

      if (onSuccess) {
        onSuccess();
      }
    },
  });

  return result;
};
