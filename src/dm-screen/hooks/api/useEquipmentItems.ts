import { useQuery } from '@tanstack/react-query';

import { API_BASE } from './constants';

export const useEquipmentItems = () => {
  const result = useQuery({
    queryKey: ['equipmentItemsData'],
    queryFn: () => {
      return fetch(`${API_BASE}/equipmentItems`, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      }).then((response) => response.json())
    }  
  });

  return result;
};