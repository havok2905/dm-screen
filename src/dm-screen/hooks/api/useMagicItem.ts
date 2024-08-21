import { useQuery } from '@tanstack/react-query';

export const useMagicItem = (id: string) => {
  const result = useQuery({
    queryKey: ['magicItemData'],
    queryFn: () => {
      return fetch(`http://localhost:3000/magicItem/${id}`, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      }).then((response) => response.json())
    }  
  });

  return result;
};