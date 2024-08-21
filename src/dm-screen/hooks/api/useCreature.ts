import { useQuery } from '@tanstack/react-query';

export const useCreature = (id: string) => {
  const result = useQuery({
    queryKey: ['creatureData'],
    queryFn: () => {
      return fetch(`http://localhost:3000/creature/${id}`, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      }).then((response) => response.json())
    }  
  });

  return result;
};
