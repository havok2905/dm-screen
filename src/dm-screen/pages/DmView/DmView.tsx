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

import { InitiativeOrder } from '@core/InitiativeOrder';
import { SocketClient } from '@core/socket';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import {
  CreaturesTable,
  InitiativeOrderComponent,
  InitiativeOrderContext,
  ItemsTable,
  ManagePlayersModal,
  Markdown,
  PlayersContext,
  PlayersTable,
  RulesSearch,
  ToolbarFooter
} from '../../components';
import {
  useAdventure,
  useBootstrapInitiative,
  useDestroyInitiative,
  useInitiative,
  useUpdateInitiative
} from '../../hooks';

export const DmView = () => {
  const [creatureSearchTerm, setCreatureSearchTerm] = useState('');
  const [itemSearchTerm, setItemSearchTerm] = useState('');
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);
  const [isNotesDrawerOpen, setIsNotesDrawerOpen] = useState(false);
  const [isManagePlayersModalOpen, setIsManagePlayersModalOpen] = useState(false);

  const socketRef = useRef<SocketClient | null>(null);

  const { id: adventureId } = useParams();

  const {
    data,
    isFetching,
    isLoading,
    isPending
  } = useAdventure(adventureId ?? '');

  const {
    data: initiativeData,
    isError: initiativeItemIsError,
    refetch: initiativeDataRefetch
  } = useInitiative(adventureId ?? '');

  //console.log({ initiativeData });

  const { mutate: bootstrapInitiative } = useBootstrapInitiative();
  const { mutate: destroyInitiative } = useDestroyInitiative();
  const { mutate: updateInitiative } = useUpdateInitiative();

  const { players } = useContext(PlayersContext);

  const {
    getInitiativeOrder,
    setInitiativeOrder
  } = useContext(InitiativeOrderContext);

  useEffect(() => {
    if (!socketRef.current) {
      const socketClient = new SocketClient('http://localhost:3000');
      
      socketClient.init();
      socketRef.current = socketClient;
    }

    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (initiativeData) {
      socketRef.current?.emit('initiative:dispatch', { adventureId });
    } else {
      socketRef.current?.emit('initiative:dispatch', { adventureId: null });
    }
  }, [
    adventureId,
    initiativeData
  ]);

  useEffect(() => {
    const initiativeOrder = getInitiativeOrder() ?? new InitiativeOrder();

    if (initiativeData) {
      initiativeOrder.setCurrentId(initiativeData.initiativeOrderState.currentId);
      initiativeOrder.setItems(initiativeData.initiativeOrderState.items);
      initiativeOrder.setRound(initiativeData.initiativeOrderState.round);
    }

    setInitiativeOrder(initiativeOrder);
  }, [
    initiativeData,
    getInitiativeOrder,
    setInitiativeOrder
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
    bootstrapInitiative(adventureId ?? '');
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

      initiativeDataRefetch();
    }
  };

  const handleAddAllToInitiativeOrder = () => {
    const newItems: InitiativeItem[]= players.map((player) => {
      const {
        ac,
        id,
        characterName
      } = player;

      return {
        entityId: id,
        entityType: EntityType.PLAYER,
        gmOnly: false,
        id: uuidv4(),
        name: characterName,
        resourceA: ac,
        resourceB: 0,
        sortValue: 0,
        visibilityState: VisibilityState.ON
      };
    });

    const initiativeOrder = getInitiativeOrder();

    if (initiativeOrder) {
      initiativeOrder.setItems([
        ...initiativeOrder.getItems(),
        ...newItems
      ]);

      handleUpdateInitiativeOrder();
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
    socketRef.current?.emit('handout:dispatch-show', {
      adventureId,
      handout
    });
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

  if (!data) {
    return null;
  }

  const adventure = data as Adventure;
  const initiativeOrderState = initiativeItemIsError ? null : initiativeData?.initiativeOrderState ?? null;

  return (
    <>
      <FooterOffset>
        <InitiativeOrderComponent
          creatures={adventure.creatures}
          handleBootstrapInitiativeOrder={handleBootstrapInitiativeOrder}
          handleDestroyInitiativeOrder={handleDestroyInitiativeOrder}
          handleUpdateInitiativeOrder={handleUpdateInitiativeOrder}
          initiativeOrderState={initiativeOrderState}/>
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
                        data-test-id={`adventure-handout-${handout.name}`}
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
