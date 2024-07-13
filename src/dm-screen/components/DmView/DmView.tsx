import {
  Adventure,
  EntityType,
  Handout,
  InitiativeItem,
  VisibilityState
} from '@core/types';
import {
  Button,
  Container,
  Footer,
  FooterOffset,
  Grid,
  GridRow,
  Input,
  Item,
  Section,
  SideDrawer
} from '@designSystem/components';
import {
  ChangeEvent,
  KeyboardEvent,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';
import {
  useMutation,
  useQuery
} from '@tanstack/react-query';

import { InitiativeOrder } from '@core/InitiativeOrder';
import { io } from 'socket.io-client';
import { Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';

import { CreaturesTable } from '../CreaturesTable';
import { InitiativeOrderComponent } from '../InitiativeOrderComponent';
import { InitiativeOrderContext } from '../InitiativeOrderContext';
import { ItemsTable } from '../ItemsTable';
import { ManagePlayersModal } from '../ManagePlayersModal';
import { Markdown } from '../Markdown';
import { PlayersContext } from '../PlayersContext';
import { PlayersTable } from '../PlayersTable';
import { RulesSearch } from '../RulesSearch';
import { ToolbarFooter } from '../ToolbarFooter';

export const DmView = () => {
  const [creatureSearchTerm, setCreatureSearchTerm] = useState('');
  const [itemSearchTerm, setItemSearchTerm] = useState('');
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);
  const [isNotesDrawerOpen, setIsNotesDrawerOpen] = useState(false);
  const [isManagePlayersModalOpen, setIsManagePlayersModalOpen] = useState(false);

  const socketRef = useRef<Socket | null>(null);

  const {
    data,
    isFetching,
    isLoading,
    isPending
  } = useQuery({
    queryKey: ['adventureData'],
    queryFn: () => {
      return fetch('http://localhost:3000/adventure/68c8bd92-04ff-4359-9856-8d2d6b02b69b').then((response) => response.json())
    }  
  });

  const {
    data: initiativeData,
    isFetching: initiativeDataIsFetching,
    isLoading: initiativeDataIsLoading,
    isPending: initiativeDataIsPending
  } = useQuery({
    queryKey: ['initiativeData'],
    queryFn: () => {
      return fetch('http://localhost:3000/initiative/68c8bd92-04ff-4359-9856-8d2d6b02b69b').then((response) => response.json())
    }  
  });

  const {
    mutate: bootstrapInitiative
  } = useMutation({
    mutationFn: () => {
      return fetch(`http://localhost:3000/initiative/68c8bd92-04ff-4359-9856-8d2d6b02b69b`, {
        method: 'POST'
      }).then((response) => response.json())
    },
  });

  const {
    mutate: destroyInitiative
  } = useMutation({
    mutationFn: (id: string) => {
      return fetch(`http://localhost:3000/initiative/${id}`, {
        method: 'DELETE'
      }).then((response) => response.json())
    },
  });

  const {
    mutate: updateInitiative
  } = useMutation({
    mutationFn: (data: { id: string;  initiativeOrderState: string; }) => {
      const {
        id,
        initiativeOrderState
      } = data;
      
      return fetch(`http://localhost:3000/initiative/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          initiativeOrderState
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then((response) => response.json())
    },
  });

  const { players } = useContext(PlayersContext);

  const {
    getInitiativeOrder,
    initiativeOrderState,
    setInitiativeOrder,
    setInitiativeOrderState
  } = useContext(InitiativeOrderContext);

  useEffect(() => {
    if (!socketRef.current) {
      // @ts-expect-error socket.io type setup isn't the most well documented and needs to be solved later. 
      socketRef.current = io('http://localhost:3000');
    }
  }, []);

  useEffect(() => {
    if (initiativeOrderState) {
      socketRef.current?.emit('initiative:dispatch', {
        currentId: initiativeOrderState.currentId,
        items: initiativeOrderState.items,
        round: initiativeOrderState.round
      });
    } else {
      socketRef.current?.emit('initiative:dispatch', null);
    }
  }, [
    initiativeOrderState
  ]);

  useEffect(() => {
    const initiativeOrder = getInitiativeOrder() ?? new InitiativeOrder();

    if (initiativeData) {
      initiativeOrder.setCurrentId(initiativeData.initiativeOrderState.currentId);
      initiativeOrder.setItems(initiativeData.initiativeOrderState.items);
      initiativeOrder.setRound(initiativeData.initiativeOrderState.round);

      setInitiativeOrder(initiativeOrder);
      setInitiativeOrderState(initiativeOrder.getState());
    }
  }, [
    getInitiativeOrder,
    initiativeData,
    setInitiativeOrder,
    setInitiativeOrderState
  ]);

  const onSideDrawerClose = () => {
    setIsSideDrawerOpen(false);
  };

  const onNotesDrawerClose = () => {
    setIsNotesDrawerOpen(false);
  };

  const handleManagePlayersModalClose = () => {
    setIsManagePlayersModalOpen(false);
  }

  const handleManagePlayersModalOpen = () => {
    setIsManagePlayersModalOpen(true);
  }

  const handleBootstrapInitiativeOrder = () => {
    bootstrapInitiative();
  };

  const handleDestroyInitiativeOrder = () => {
    if (initiativeData) {
      destroyInitiative(initiativeData.id);
    }
  };

  const handleUpdateInitiativeOrder = () => {
    const initiativeOrder = getInitiativeOrder();

    if (initiativeData && initiativeOrder) {
      updateInitiative({
        id: initiativeData.id,
        initiativeOrderState: JSON.stringify(initiativeOrder.getState())
      });
    }
  };

  const handleAddAllToInitiativeOrder = () => {
    const newItems: InitiativeItem[]= players.map((player) => {
      const {
        ac,
        id,
        name
      } = player;

      return {
        entityId: id,
        entityType: EntityType.PLAYER,
        id: uuidv4(),
        name,
        resourceA: ac,
        resourceB: 0,
        sortValue: 0,
        visibilityState: VisibilityState.ON
      };
    });

    const initiativeOrder = getInitiativeOrder();

    if (initiativeOrder) {
      initiativeOrder.setItems([
        ...initiativeOrder?.getItems() ?? [],
        ...newItems
      ]);

      handleUpdateInitiativeOrder();
      setInitiativeOrderState(initiativeOrder.getState());
    }
  }

  const handleOnCreatureChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCreatureSearchTerm(value);
  }

  const handleOnItemChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setItemSearchTerm(value);
  }

  const handleShowHandout = (handout: Handout | null) => {
    socketRef.current?.emit('handout:dispatch-show', handout);
  };

  const playerCharacterButtons = (
    <>
      <Button
        buttonText="Add all to combat"
        disabled={!players.length}
        onClick={handleAddAllToInitiativeOrder}
        onKeyDown={(e: KeyboardEvent) => {
          if (e.key === 'Enter') {
            handleAddAllToInitiativeOrder();
          }
        }}/>
      <Button
        buttonText="Manage players"
        onClick={handleManagePlayersModalOpen}
        onKeyDown={(e: KeyboardEvent) => {
          if (e.key === 'Enter') {
            handleManagePlayersModalOpen();
          }
        }}/>
    </>
  );

  if (
    isFetching ||
    isLoading ||
    isPending
  ) return null;

  if (
    initiativeDataIsFetching ||
    initiativeDataIsLoading ||
    initiativeDataIsPending
  ) return null;

  if (!data) {
    return null;
  }

  const adventure = data as Adventure;

  return (
    <>
      <FooterOffset>
        <InitiativeOrderComponent
          creatures={adventure.creatures}
          handleBootstrapInitiativeOrder={handleBootstrapInitiativeOrder}
          handleDestroyInitiativeOrder={handleDestroyInitiativeOrder}
          handleUpdateInitiativeOrder={handleUpdateInitiativeOrder}/>
        <Container>
          <Grid>
            <GridRow>
              <Item columns={6}>
                <Section
                  sectionActions={playerCharacterButtons}
                  sectionHeaderEl="h3"
                  sectionTitle="Player Characters">
                  <PlayersTable/>
                </Section>
                <Section
                  sectionActions={(
                    <Input
                      inputId="creatures"
                      inputName="creatures"
                      onChange={handleOnCreatureChange}
                      value={creatureSearchTerm}/>
                  )}
                  sectionHeaderEl="h3"
                  sectionTitle="Creatures">
                  <CreaturesTable
                    creatures={adventure.creatures}
                    handleShowHandout={handleShowHandout}
                    handleUpdateInitiativeOrder={handleUpdateInitiativeOrder}
                    searchTerm={creatureSearchTerm}/>
                </Section>
                <Section
                  sectionActions={(
                    <Input
                      inputId="items"
                      inputName="items"
                      onChange={handleOnItemChange}
                      value={itemSearchTerm}/>
                  )}
                  sectionHeaderEl="h3"
                  sectionTitle="Items">
                  <ItemsTable
                    handleShowHandout={handleShowHandout}
                    items={adventure.items}
                    searchTerm={itemSearchTerm}/>
                </Section>
              </Item>
              <Item columns={6}>
                <Section
                  sectionHeaderEl="h3"
                  sectionTitle="Handouts">
                  {
                    adventure.handouts.map(handout => (
                      <img 
                        alt={handout.description}
                        key={handout.id}
                        onClick={() => {
                          handleShowHandout(handout);
                        }}
                        src={handout.url}
                        style={{
                          cursor: 'pointer',
                          maxWidth: '100%'
                        }} />
                    ))
                  }
                </Section>
              </Item>
            </GridRow>
          </Grid>
        </Container>
        <Footer>
          <ToolbarFooter
            handleShowHandout={handleShowHandout}
            setIsNotesDrawerOpen={setIsNotesDrawerOpen}
            setIsSideDrawerOpen={setIsSideDrawerOpen}
          />
        </Footer>
      </FooterOffset>
      <SideDrawer
        isOpen={isSideDrawerOpen}
        onClose={onSideDrawerClose}
        portalElement={document.body}
      >
        <RulesSearch/>
      </SideDrawer>
      <SideDrawer
        isOpen={isNotesDrawerOpen}
        onClose={onNotesDrawerClose}
        portalElement={document.body}>
        <Markdown content={adventure.notes}/>
      </SideDrawer>
      <ManagePlayersModal
        isOpen={isManagePlayersModalOpen}
        onClose={handleManagePlayersModalClose}/>
    </>
  );
};
