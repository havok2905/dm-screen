import { useQuery } from '@tanstack/react-query';

export const useInitiative = (id: string) => {
  const result = useQuery({
    queryKey: ['initiativeData'],
    queryFn: () => {
      return fetch(`http://localhost:3000/initiative/${id}`).then((response) => response.json())
    }  
  });

  return result;
};