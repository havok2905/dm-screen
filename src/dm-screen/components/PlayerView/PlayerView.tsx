import { useQuery } from '@tanstack/react-query';
import { Container } from '@designSystem/components';
import { Adventure } from '../../../core/types';

export const PlayerView = () => {
  const {
    data,
    isFetching,
    isLoading,
    isPending
  } = useQuery({
    queryKey: ['adventureData'],
    queryFn: () => {
      return fetch('http://localhost:3000/adventure/1').then((response) => response.json())
    }  
  });

  if (
    isFetching ||
    isLoading ||
    isPending
  ) return null;

  if (!data) {
    return null;
  }

  const adventure = data as Adventure;

  return (
    <>
      <Container>
        <h1>Player View</h1>
        {
          adventure.handouts.map((item) => {
            return (
              <img
                alt={item.description}
                key={item.id}
                src={item.url}
              />
            )
          })
        }
      </Container>
    </>
  )
};
