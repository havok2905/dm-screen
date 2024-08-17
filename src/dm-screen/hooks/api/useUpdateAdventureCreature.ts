import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query';

import { MetaData } from '@core/types';

export const useUpdateAdventureCreature = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  const result = useMutation({
    mutationFn: ({
      adventureid,
      content,
      id,
      image,
      metadata,
      name
    }: {
      adventureid: string,
      content: string,
      id: string,
      image: string,
      metadata: MetaData[],
      name: string
    }) => {
      return fetch(`http://localhost:3000/adventureCreature/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          adventureid,
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
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          'adventureData',
          'adventureCreatureData',
          'adventureCreaturesData'
        ]
      });

      if (onSuccess) {
        onSuccess();
      }
    },
  });

  return result;
};
