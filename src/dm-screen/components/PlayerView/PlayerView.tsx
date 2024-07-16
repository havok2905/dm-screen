import {
  Adventure,
  Handout,
  InitiativeItem,
  VisibilityState
} from '@core/types';
import { 
  Container,
  Grid,
  GridRow,
  Item,
  Modal
} from '@designSystem/components';
import {
  useEffect,
  useRef,
  useState,
} from 'react';

import { io } from 'socket.io-client';
import { Socket } from 'socket.io';

import {
  useAdventure,
  useInitiative
} from '../../hooks';

import { InitiativeOrderComponent } from '../InitiativeOrderComponent';
import { PlayerSplash } from './PlayerSplash';

export const PlayerView = () => {
  const socketRef = useRef<Socket | null>(null);
  const [imageToDisplay, setImageToDisplay] = useState<Handout | null>(null);

  const {
    data,
    isFetching,
    isLoading,
    isPending
  } = useAdventure('68c8bd92-04ff-4359-9856-8d2d6b02b69b');

  const {
    data: initiativeData,
    refetch: initiativeDataRefetch
  } = useInitiative('68c8bd92-04ff-4359-9856-8d2d6b02b69b');

  useEffect(() => {
    if (!socketRef.current) {
      // @ts-expect-error socket.io type setup isn't the most well documented and needs to be solved later. 
      socketRef.current = io('http://localhost:3000');
    }

    const ws = socketRef.current;

    ws?.on('handout:receive-show', (data) => {
      setImageToDisplay(data);
    });

    ws?.on('initiative:receive', () => {
      initiativeDataRefetch();
    });
  }, [
    initiativeDataRefetch
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
  const items: InitiativeItem[] = initiativeData?.initiativeOrderState?.items ?? [];

  const getCurrentPlayer = (): InitiativeItem | null => {
    return initiativeData?.initiativeOrderState?.items?.find((i: InitiativeItem) => i.id === initiativeData?.initiativeOrderState?.currentId) ?? null;
  };

  const getNextPlayer = (): InitiativeItem | null => {
    const itemIndex = items.findIndex((i: InitiativeItem) => i.id === initiativeData?.initiativeOrderState?.currentId);

    // Next player does not exist
    if (itemIndex === -1) {
      return null;
    }

    // Find the next possible next item
    // TODO: Turn this into a generic helper function
    let nextItem: InitiativeItem | null = null;
    let x = itemIndex;
    while(!nextItem) {
      const nextIndex = x === items.length - 1
        ? 0
        : x+1;
      
      const n = items[nextIndex];

      if (n.visibilityState != VisibilityState.REMOVED && !n.gmOnly) {
        nextItem = n;
      }

      x = nextIndex;
    }

    return nextItem;
  };

  const currentPlayer = getCurrentPlayer();
  const nextPlayer = getNextPlayer();

  // Placeholder check until there's a better way to know when out of combat
  if (items.length === 0) {
        return (<PlayerSplash adventure={adventure} />);
  } else {
    return (
      <>
        <InitiativeOrderComponent
          creatures={adventure.creatures}
          initiativeOrderState={initiativeData?.initiativeOrderState ?? null}
          playerView/>
        <Container>
          <Grid>
            <GridRow>
              <Item columns={6}>
                <div style={{
                  textAlign: 'center'
                }}>
                  <h2>Playing</h2>
                  <h4>{currentPlayer?.name}</h4>
                  <img
                    alt={currentPlayer?.name}
                    src={currentPlayer?.imageSrc ?? '/d20.jpg'}
                    style={{
                      maxHeight: '250px',
                      maxWidth: '100%'
                    }}
                  />
                </div>
              </Item>
              <Item columns={6}>
                <div style={{
                  textAlign: 'center'
                }}>
                  <h2>On Deck</h2>
                  <h4>{nextPlayer?.name}</h4>
                  <img
                    alt={nextPlayer?.name}
                    src={nextPlayer?.imageSrc ?? '/d20.jpg'}
                    style={{
                      maxHeight: '250px',
                      maxWidth: '100%'
                    }}
                  />
                </div>
              </Item>
            </GridRow>
          </Grid>
          {
            !!imageToDisplay && (
              <Modal
                isOpen={!!imageToDisplay}
                isShowcaseView={true}
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
                    display: 'block',
                    margin: '0 auto',
                    maxWidth: '100%'
                  }}/>
              </Modal>
            )
          }
        </Container>
      </>
    )
  }
};
