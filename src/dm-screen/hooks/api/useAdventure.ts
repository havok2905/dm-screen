import { API_BASE } from './constants';
import { useQuery } from '@tanstack/react-query';

export const useAdventure = (id: string) => {
  const result = useQuery({
    queryKey: ['adventureData'],
    queryFn: () => {
      return fetch(`${API_BASE}/adventure/${id}`, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      }).then((response) => response.json())
    }  
  });

  return result;
};