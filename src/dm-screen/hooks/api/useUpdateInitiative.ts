import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query';

import { API_BASE } from './constants';

export const useUpdateInitiative = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  const result = useMutation({
    mutationFn: (data: { id: string;  initiativeOrderState: string; }) => {
      const {
        id,
        initiativeOrderState
      } = data;
      
      return fetch(`${API_BASE}/initiative/${id}`, {
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

      if (onSuccess) {
        onSuccess();
      }
    },
  });

  return result;
};
