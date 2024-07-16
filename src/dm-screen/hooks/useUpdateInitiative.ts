import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query';

export const useUpdateInitiative = () => {
  const queryClient = useQueryClient();

  const result = useMutation({
    mutationFn: (data: { id: string;  initiativeOrderState: string; }) => {
      const {
        id,
        initiativeOrderState
      } = data;
      
      return fetch(`http://localhost:3000/initiative/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          initiativeOrderState
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then((response) => response.json())
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['initiativeData'] });
    },
  });

  return result;
};
