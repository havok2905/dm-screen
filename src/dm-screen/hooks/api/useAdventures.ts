import { API_BASE } from './constants';
import { useQuery } from '@tanstack/react-query';

export const useAdventures = () => {
  const result = useQuery({
    queryKey: ['adventuresData'],
    queryFn: () => {
      return fetch(`${API_BASE}/adventures`, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      }).then((response) => response.json())
    }  
  });

  return result;
};