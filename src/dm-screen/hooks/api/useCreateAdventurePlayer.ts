import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query';

import { API_BASE } from './constants';

export const useCreateAdventurePlayer = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  const result = useMutation({
    mutationFn: ({
      ac,
      adventureid,
      charactername,
      id,
      image,
      playername
    }: {
      ac: number,
      adventureid: string,
      charactername: string,
      id: string,
      image: string,
      playername: string
    }) => {
      return fetch(`${API_BASE}/adventurePlayers/`, {
        method: 'POST',
        body: JSON.stringify({
          ac,
          adventureid,
          charactername,
          id,
          image,
          playername
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then((response) => response.json())
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['adventuresData', 'adventureData', 'adventurePlayerData', 'adventurePlayersData']
      });

      if (onSuccess) {
        onSuccess();
      }
    },
  });

  return result;
};
