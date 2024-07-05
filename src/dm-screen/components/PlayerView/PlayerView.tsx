import {
  useEffect,
  useState,
  useRef,
  useContext
} from 'react';
import { io } from 'socket.io-client';
import { Socket } from 'socket.io';
import {
  useQuery
} from '@tanstack/react-query';
import { 
  Container,
  Modal
} from '@designSystem/components';
import { Adventure } from '../../../core/types';
import { InitiativeOrder } from '../InitiativeOrder';
import { InitiativeOrderContext } from '../InitiativeOrderContext';

export const PlayerView = () => {
  const socketRef = useRef<Socket | null>(null);
  const [imageToDisplay, setImageToDisplay] = useState<any>(null);

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

  const {
    setCurrentId,
    setItems,
    setRound
  } = useContext(InitiativeOrderContext);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io('http://localhost:3000');
    }

    const ws = socketRef.current;

    ws?.on('handout:receive-show', (data) => {
      setImageToDisplay(data);
      console.log({ data });
    });

    ws?.on('initiative:receive', (data) => {
      const {
        currentId,
        items,
        round,
      } = data;

      setCurrentId(currentId);
      setItems(items);
      setRound(round);
    });
  }, [
    setCurrentId,
    setItems,
    setRound
  ]);

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
      <InitiativeOrder
        creatures={adventure.creatures}
        playerView/>
      <Container>
        <h1>Playing:</h1>
        <h2>On Deck:</h2>
        {
          !!imageToDisplay && (
            <Modal
              isOpen={!!imageToDisplay}
              onClose={() => {
                setImageToDisplay(null);
              }}
              portalElement={document.body}
              >
              <img
                alt={imageToDisplay.description}
                key={imageToDisplay.id}
                src={imageToDisplay.url}
                style={{
                  maxWidth: '100%'
                }}/>
            </Modal>
          )
        }
      </Container>
    </>
  )
};
