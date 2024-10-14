import { useQuery } from '@tanstack/react-query';

import { API_BASE } from './constants';

export const useSpells = () => {
  const result = useQuery({
    queryKey: ['spellsData'],
    queryFn: () => {
      return fetch(`${API_BASE}/spells`, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      }).then((response) => response.json())
    }  
  });

  return result;
};