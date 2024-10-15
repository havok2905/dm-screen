import { useQuery } from '@tanstack/react-query';

import { API_BASE } from './constants';

export const useMagicItem = (id: string) => {
  const result = useQuery({
    queryKey: ['magicItemData'],
    queryFn: () => {
      return fetch(`${API_BASE}/magicItem/${id}`, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      }).then((response) => response.json())
    }  
  });

  return result;
};