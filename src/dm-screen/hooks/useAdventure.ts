import { useQuery } from '@tanstack/react-query';

export const useAdventure = (id: string) => {
  const result = useQuery({
    queryKey: ['adventureData'],
    queryFn: () => {
      return fetch(`http://localhost:3000/adventure/${id}`).then((response) => response.json())
    }  
  });

  return result;
};