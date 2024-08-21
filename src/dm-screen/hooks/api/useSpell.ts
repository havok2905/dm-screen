import { useQuery } from '@tanstack/react-query';

export const useSpell = (id: string) => {
  const result = useQuery({
    queryKey: ['spellData'],
    queryFn: () => {
      return fetch(`http://localhost:3000/spell/${id}`, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      }).then((response) => response.json())
    }  
  });

  return result;
};