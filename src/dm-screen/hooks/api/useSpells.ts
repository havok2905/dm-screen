import { useQuery } from '@tanstack/react-query';

export const useSpells = () => {
  const result = useQuery({
    queryKey: ['spellsData'],
    queryFn: () => {
      return fetch('http://localhost:3000/spells', {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      }).then((response) => response.json())
    }  
  });

  return result;
};