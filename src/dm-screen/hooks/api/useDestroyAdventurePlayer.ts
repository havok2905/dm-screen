import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query';

import { API_BASE } from './constants';

export const useDestroyAdventurePlayer = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  const result = useMutation({
    mutationFn: (id: string) => {
      return fetch(`${API_BASE}/adventurePlayers/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      }).then((response) => response.json())
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adventureData', 'adventuresData', 'adventurePlayerData', 'adventurePlayersData'] });

      if (onSuccess) {
        onSuccess();
      }
    },
  });

  return result;
};
