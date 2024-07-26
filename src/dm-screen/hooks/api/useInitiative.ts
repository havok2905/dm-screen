import { useQuery } from '@tanstack/react-query';

export const useInitiative = (id: string) => {
  const result = useQuery({
    queryKey: ['initiativeData'],
    queryFn: () => {
      return fetch(`http://localhost:3000/initiative/${id}`, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      }).then((response) => response.json())
    },
    retry: 1
  });

  return result;
};
