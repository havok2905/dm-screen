import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query';

import { API_BASE } from './constants';

export const useDestroyAdventureHandout = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  const result = useMutation({
    mutationFn: (id: string) => {
      return fetch(`${API_BASE}/adventureHandouts/${id}`, {
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
