import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query';

import { API_BASE } from './constants';

export const useUpdateAdventure = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  const result = useMutation({
    mutationFn: ({
      description,
      id,
      name,
      notes,
      system
    }: {
      description: string;
      id: string;
      name: string;
      notes: string;
      system: string;
    }) => {
      return fetch(`${API_BASE}/adventure/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          description,
          name,
          notes,
          system
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then((response) => response.json())
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          'adventureData',
          'adventuresData'
        ]
      });

      if (onSuccess) {
        onSuccess();
      }
    },
  });

  return result;
};
