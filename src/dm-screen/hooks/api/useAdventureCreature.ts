import { useQuery } from '@tanstack/react-query';

export const useAdventureCreature = (id: string) => {
  const result = useQuery({
    queryKey: ['adventureCreatureData'],
    queryFn: () => {
      return fetch(`http://localhost:3000/adventureCreature/${id}`, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      }).then((response) => response.json())
    }  
  });

  return result;
};