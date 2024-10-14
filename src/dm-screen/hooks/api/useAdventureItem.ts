import { API_BASE } from './constants';
import { useQuery } from '@tanstack/react-query';

export const useAdventureItem = (id: string) => {
  const result = useQuery({
    queryKey: ['adventureItemData'],
    queryFn: () => {
      return fetch(`${API_BASE}/adventureItem/${id}`, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      }).then((response) => response.json())
    }  
  });

  return result;
};