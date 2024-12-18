import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query';

import { API_BASE } from './constants';

export const useImportDnd5eApi = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  const result = useMutation({
    mutationFn: () => {
      return fetch(`${API_BASE}/import/dnd5eapi`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      }).then((response) => response.json())
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [
        'creaturesData',
        'equipmentItemsData',
        'magicItemsData',
        'spellsData'
      ] });

      if (onSuccess) {
        onSuccess();
      }
    },
  });

  return result;
};
