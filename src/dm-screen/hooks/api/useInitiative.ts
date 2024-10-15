import { useQuery } from '@tanstack/react-query';

import { API_BASE } from './constants';

export const useInitiative = (id: string) => {
  const result = useQuery({
    queryKey: ['initiativeData'],
    queryFn: () => {
      return fetch(`${API_BASE}/initiative/${id}`, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      }).then((response) => response.json())
    },
    retry: 1
  });

  return result;
};
