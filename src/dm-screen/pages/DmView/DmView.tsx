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
  PlayersTable,
  RulesSearch,
  SpellsSearch,
  ToolbarFooter
} from '../../components';
import {
  useAdventure,
  useBootstrapInitiative,
  useDestroyInitiative,
  useInitiative,
  useSpells,
  useUpdateInitiative
} from '../../hooks';

import { API_BASE } from '../../hooks/api/constants';

export const DmView = () => {
  const [creatureSearchTerm, setCreatureSearchTerm] = useState('');
  const [itemSearchTerm, setItemSearchTerm] = useState('');
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);
  const [isNotesDrawerOpen, setIsNotesDrawerOpen] = useState(false);
  const [isSpellsDrawerOpen, setIsSpellsDrawerOpen] = useState(false);
  const [isManagePlayersModalOpen, setIsManagePlayersModalOpen] = useState(false);

  const socketRef = useRef<SocketClient | null>(null);

  const { id: adventureId } = useParams();

  const {
    data,
    isLoading,
    isPending,
    refetch
  } = useAdventure(adventureId ?? '');

  const {
    data: initiativeData,
    isError: initiativeItemIsError,
    refetch: initiativeDataRefetch
  } = useInitiative(adventureId ?? '');

  const {
    data: spellsData
  } = useSpells();

  const { mutate: bootstrapInitiative } = useBootstrapInitiative();
  const { mutate: destroyInitiative } = useDestroyInitiative();
  const { mutate: updateInitiative } = useUpdateInitiative();

  const {
    getInitiativeOrder,
    setInitiativeOrder
  } = useContext(InitiativeOrderContext);

  useEffect(() => {
    if (!socketRef.current) {
      const socketClient = new SocketClient(API_BASE);
      
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
  
  const onSpellDrawerClose = () => {
    setIsSpellsDrawerOpen(false);
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
    const players = data.players ?? [];
  
    const newItems: InitiativeItem[] = players.map((player) => {
      const {
        ac,
        id,
        image,
        charactername
      } = player;

      return {
        conditions: '',
        entityId: id,
        entityType: EntityType.PLAYER,
        gmOnly: false,
        id: uuidv4(),
        imageSrc: image ?? '',
        name: charactername,
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

  if (
    isLoading ||
    isPending
  ) return null;

  if (!data) {
    return null;
  }

  const playerCharacterButtons = (
    <>
      <Button
        buttonText="Add all to combat"
        disabled={!data.players?.length}
        onClick={handleAddAllToInitiativeOrder}
      />
      <Button
        buttonText="Add player"
        onClick={handleManagePlayersModalOpen}
      />
    </>
  );

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
          initiativeOrderState={initiativeOrderState}
          players={adventure.players}
        />
        <Container>
          <Grid>
            <GridRow>
              <Item columns={6}>
                <Section
                  sectionActions={playerCharacterButtons}
                  sectionHeaderEl="h3"
                  sectionTitle="Player Characters">
                  <PlayersTable
                    adventureId={data.id ?? ''}
                    players={data.players ?? []}
                    refetch={refetch}
                  />
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
            setIsSpellsDrawerOpen={setIsSpellsDrawerOpen}
          />
        </Footer>
      </FooterOffset>
      <SideDrawer
        isOpen={isSideDrawerOpen}
        onClose={onSideDrawerClose}
        portalElement={document.body}
        preserveScroll={false}
      >
        <RulesSearch/>
      </SideDrawer>
      <SideDrawer
        isOpen={isNotesDrawerOpen}
        onClose={onNotesDrawerClose}
        portalElement={document.body}
        preserveScroll
      >
        <Markdown content={adventure.notes}/>
      </SideDrawer>
      <SideDrawer
        isOpen={isSpellsDrawerOpen}
        onClose={onSpellDrawerClose}
        portalElement={document.body}
        preserveScroll={false}
      >
        <SpellsSearch spells={spellsData}/>
      </SideDrawer>
      <ManagePlayersModal
        adventureId={data.id}
        isOpen={isManagePlayersModalOpen}
        mutateType="create"
        onClose={handleManagePlayersModalClose}
        refetch={refetch}
      />
    </>
  );
};
