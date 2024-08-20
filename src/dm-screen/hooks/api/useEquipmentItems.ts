import { useQuery } from '@tanstack/react-query';

export const useEquipmentItems = () => {
  const result = useQuery({
    queryKey: ['equipmentItemsData'],
    queryFn: () => {
      return fetch('http://localhost:3000/equipmentItems', {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      }).then((response) => response.json())
    }  
  });

  return result;
};