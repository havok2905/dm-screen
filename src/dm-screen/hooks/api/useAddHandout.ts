import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query';

import { API_BASE } from './constants';

export const useAddHandout = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  const result = useMutation({
    mutationFn: ({
      id,
      formData
    }: {
      id: string,
      formData: FormData
    }) => {
      return fetch(`${API_BASE}/adventure/${id}/addHandout`, {
        method: 'POST',
        body: formData
      }).then((response) => response.json())
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['adventureData', 'adventuresData']
      });

      if (onSuccess) {
        onSuccess();
      }
    }
  });

  return result;
};