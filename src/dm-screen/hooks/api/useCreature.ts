import { useQuery } from '@tanstack/react-query';

import { API_BASE } from './constants';

export const useCreature = (id: string) => {
  const result = useQuery({
    queryKey: ['creatureData'],
    queryFn: () => {
      return fetch(`${API_BASE}/creature/${id}`, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      }).then((response) => response.json())
    }  
  });

  return result;
};
