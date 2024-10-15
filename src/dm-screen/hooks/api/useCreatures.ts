import { useQuery } from '@tanstack/react-query';

import { API_BASE } from './constants';

export const useCreatures = () => {
  const result = useQuery({
    queryKey: ['creaturesData'],
    queryFn: () => {
      return fetch(`${API_BASE}/creatures`, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      }).then((response) => response.json())
    }  
  });

  return result;
};