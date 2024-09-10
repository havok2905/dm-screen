import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query';

import { MetaData } from '@core/types';

export const useCreateEquipmentItem = (onSuccess?: () => void) => {
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
      return fetch('http://localhost:3000/equipmentItems/', {
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
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          'equipmentItemsData'
        ]
      });

      if (onSuccess) {
        onSuccess();
      }
    },
  });

  return result;
};
