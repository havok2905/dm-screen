import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query';

import { API_BASE } from './constants';

type EntityType =
  'adventure-splash-image' |
  'adventure-creature' |
  'adventure-item' |
  'adventure-player' |
  'creature' |
  'magic-item' |
  'equipment-item' |
  'spell';

export const useAddImage = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  const result = useMutation({
    mutationFn: ({
      entityType,
      id,
      formData
    }: {
      entityType: EntityType,
      id: string,
      formData: FormData
    }) => {
      return fetch(`${API_BASE}/image/${entityType}/${id}/addImage`, {
        method: 'POST',
        body: formData
      }).then((response) => response.json())
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          'adventureData',
          'adventurePlayerData',
          'adventurePlayersData',
          'creatureData',
          'equipmentItemData',
          'magicItemData',
          'spellData'
        ]
      });

      if (onSuccess) {
        onSuccess();
      }
    }
  });

  return result;
};