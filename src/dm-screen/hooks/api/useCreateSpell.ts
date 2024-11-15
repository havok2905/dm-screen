import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query';

import { MetaData } from '@core/types';

import { API_BASE } from './constants';

export const useCreateSpell = (onSuccess?: (id: string) => void) => {
  const queryClient = useQueryClient();

  const result = useMutation({
    mutationFn: ({
      content,
      id,
      image,
      metadata,
      name
    }: {
      content: string,
      id: string,
      image: string,
      metadata: MetaData[],
      name: string
    }) => {
      return fetch(`${API_BASE}/spells/`, {
        method: 'POST',
        body: JSON.stringify({
          content,
          id,
          image,
          metadata,
          name
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then((response) => response.json())
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [
          'spellsData'
        ]
      });

      if (onSuccess) {
        onSuccess(data.id);
      }
    },
  });

  return result;
};
