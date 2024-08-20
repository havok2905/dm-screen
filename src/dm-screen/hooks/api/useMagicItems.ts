import { useQuery } from '@tanstack/react-query';

export const useMagicItems = () => {
  const result = useQuery({
    queryKey: ['magicItemsData'],
    queryFn: () => {
      return fetch('http://localhost:3000/magicItems', {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      }).then((response) => response.json())
    }  
  });

  return result;
};