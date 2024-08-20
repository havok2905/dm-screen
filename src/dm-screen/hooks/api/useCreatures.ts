import { useQuery } from '@tanstack/react-query';

export const useCreatures = () => {
  const result = useQuery({
    queryKey: ['creaturesData'],
    queryFn: () => {
      return fetch('http://localhost:3000/creatures', {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      }).then((response) => response.json())
    }  
  });

  return result;
};