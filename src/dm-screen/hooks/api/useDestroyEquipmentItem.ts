import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query';

export const useDestroyEquipmentItem = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  const result = useMutation({
    mutationFn: (id: string) => {
      return fetch(`http://localhost:3000/equipmentItem/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      }).then((response) => response.json())
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['equipmentItemsData'] });

      if (onSuccess) {
        onSuccess();
      }
    },
  });

  return result;
};
