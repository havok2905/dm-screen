import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query';

import { API_BASE } from './constants';

export const useCreateAdventure = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  const result = useMutation({
    mutationFn: ({
      description,
      id,
      name,
      system
    }: {
      description: string;
      id: string;
      name: string;
      system: string;
    }) => {
      return fetch(`${API_BASE}/adventures/`, {
        method: 'POST',
        body: JSON.stringify({
          description,
          id,
          name,
          system
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then((response) => response.json())
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['adventuresData']
      });

      if (onSuccess) {
        onSuccess();
      }
    },
  });

  return result;
};
