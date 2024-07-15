import { useQuery } from '@tanstack/react-query';

export const useAdventures = () => {
  const result = useQuery({
    queryKey: ['adventuresData'],
    queryFn: () => {
      return fetch('http://localhost:3000/adventures').then((response) => response.json())
    }  
  });

  return result;
};