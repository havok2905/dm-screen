import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query';

export const useAddCreature = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  const result = useMutation({
    mutationFn: ({
      id,
      creatureId
    }: {
      id: string;
      creatureId: string;
    }) => {
      return fetch(`http://localhost:3000/adventure/${id}/addCreature/${creatureId}`, {
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
