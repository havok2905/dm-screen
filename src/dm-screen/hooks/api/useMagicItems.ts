import { useQuery } from '@tanstack/react-query';

import { API_BASE } from './constants';

export const useMagicItems = () => {
  const result = useQuery({
    queryKey: ['magicItemsData'],
    queryFn: () => {
      return fetch(`${API_BASE}/magicItems`, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      }).then((response) => response.json())
    }  
  });

  return result;
};