import { useQuery } from '@tanstack/react-query';

import { API_BASE } from './constants';

export const useEquipmentItem = (id: string) => {
  const result = useQuery({
    queryKey: ['equipmentItemData'],
    queryFn: () => {
      return fetch(`${API_BASE}/equipmentItem/${id}`, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      }).then((response) => response.json())
    }  
  });

  return result;
};