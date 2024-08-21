import { useQuery } from '@tanstack/react-query';

export const useEquipmentItem = (id: string) => {
  const result = useQuery({
    queryKey: ['equipmentItemData'],
    queryFn: () => {
      return fetch(`http://localhost:3000/equipmentItem/${id}`, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      }).then((response) => response.json())
    }  
  });

  return result;
};