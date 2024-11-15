import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query';

import { API_BASE } from './constants';

type EntityType =
  'adventure-splash-image' |
  'adventure-creature' |
  'adventure-item' |
  'creature' |
  'magic-item' |
  'equipment-item' |
  'spell';

export const useRemoveImage = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  const result = useMutation({
    mutationFn: ({
      entityType,
      id,
    }: {
      entityType: EntityType,
      id: string,
    }) => {
      return fetch(`${API_BASE}/image/${entityType}/${id}/removeImage`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      }).then((response) => response.json())
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          'adventureData',
          'creatureData',
          'equipmentItemData',
          'magicItemData',
          'spellData'
        ]
      });

      if (onSuccess) {
        onSuccess();
      }
    },
  });

  return result;
};
