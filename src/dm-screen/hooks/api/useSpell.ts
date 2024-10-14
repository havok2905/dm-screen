import { useQuery } from '@tanstack/react-query';

import { API_BASE } from './constants';

export const useSpell = (id: string) => {
  const result = useQuery({
    queryKey: ['spellData'],
    queryFn: () => {
      return fetch(`${API_BASE}/spell/${id}`, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      }).then((response) => response.json())
    }  
  });

  return result;
};