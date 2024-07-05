import {
  ChangeEvent,
  KeyboardEvent,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';
import { io } from 'socket.io-client';
import { Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import {
  useQuery
} from '@tanstack/react-query';
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
import { CreaturesTable } from '../CreaturesTable';
import {
  Adventure,
  Handout,
  InitiativeItem
} from '../../../core/types';
import { InitiativeOrder } from '../InitiativeOrder';
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
      return fetch('http://localhost:3000/adventure/1').then((response) => response.json())
    }  
  });

  const { players } = useContext(PlayersContext);

  const {
    initiativeOrder: {
      currentId,
      items,
      round
    },
    setItems
  } = useContext(InitiativeOrderContext);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io('http://localhost:3000');
    }
  }, []);

  useEffect(() => {
    socketRef.current?.emit('initiative:dispatch', {
      currentId,
      items,
      round
    });
  }, [
    currentId,
    items,
    round
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

  const handleAddAllToInitiativeOrder = () => {
    const newItems: InitiativeItem[]= players.map((player) => {
      const {
        ac,
        id,
        name
      } = player;

      return {
        entityId: id,
        entityType: 'player',
        id: uuidv4(),
        name,
        resourceA: ac,
        resourceB: 0,
        sortValue: 0,
        visibilityState: 'on'
      };
    });

    setItems([
      ...items,
      ...newItems
    ])
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

  if (!data) {
    return null;
  }

  const adventure = data as Adventure;

  return (
    <>
      <FooterOffset>
        <InitiativeOrder creatures={adventure.creatures}/>
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
                        src={handout.url} />
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
            setIsSideDrawerOpen={setIsSideDrawerOpen}
            setIsNotesDrawerOpen={setIsNotesDrawerOpen}/>
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
