import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query';

import { API_BASE } from './constants';

export const useRemoveImage = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  const result = useMutation({
    mutationFn: ({
      entityType,
      id,
    }: {
      entityType: 'creature' | 'magic-item' | 'equipment-item' | 'spell',
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
