import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query';

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
      return fetch(`http://localhost:3000/adventure/${id}/addHandout`, {
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