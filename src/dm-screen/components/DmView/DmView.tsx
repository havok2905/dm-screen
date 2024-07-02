import {
  ChangeEvent,
  KeyboardEvent,
  useContext,
  useState
} from 'react';
import {
  Button,
  Container,
  Footer,
  FooterOffset,
  Grid,
  GridRow,
  Input,
  Item,
  Modal,
  Section,
  SideDrawer
} from '@designSystem/components';
import { AdventureContext } from '../AdventureContext';
import { CreaturesTable } from '../CreaturesTable';
import { InitiativeOrder } from '../InitiativeOrder';
import { ItemsTable } from '../ItemsTable';
import { PlayersContext } from '../PlayersContext';
import { PlayersTable } from '../PlayersTable';
import { RulesSearch } from '../RulesSearch';
import { ToolbarFooter } from '../ToolbarFooter';

export const DmView = () => {
  const [creatureSearchTerm, setCreatureSearchTerm] = useState('');
  const [itemSearchTerm, setItemSearchTerm] = useState('');
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);
  const [isManagePlayersModalOpen, setIsManagePlayersModalOpen] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [newCharacterName, setNewCharacterName] = useState('');
  const [newCharacterAc, setNewCharacterAc] = useState(0);

  const adventure = useContext(AdventureContext);
  const { players, setPlayers } = useContext(PlayersContext);

  const onSideDrawerClose = () => {
    setIsSideDrawerOpen(false);
  };

  const handleManagePlayersModalClose = () => {
    setIsManagePlayersModalOpen(false);
  }

  const handleManagePlayersModalOpen = () => {
    setIsManagePlayersModalOpen(true);
  }

  const newPlayersModalSubmit = () => {
    if (newPlayerName && newCharacterName) {
      setPlayers([
        ...players,
        {
          ac: newCharacterAc,
          id: String(Date.now()),
          name: newPlayerName,
          characterName: newCharacterName
        }
      ]);
      setNewPlayerName('');
      setNewCharacterName('');
      setNewCharacterAc(0);
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

  const playerCharacterButtons = (
    <>
      <Button buttonText="Add all to combat"/>
      <Button
        buttonText="Manage Players"
        onClick={handleManagePlayersModalOpen}
        onKeyDown={(e: KeyboardEvent) => {
          if (e.key === 'Enter') {
            handleManagePlayersModalOpen();
          }
        }}/>
    </>
  );

  return (
    <>
      <FooterOffset>
        <InitiativeOrder/>
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
              </Item>
              <Item columns={6}>
                <Section
                  sectionHeaderEl="h3"
                  sectionTitle="Handouts">
                  {
                    adventure.handouts.map(handout => (
                      <img alt={handout.description} src={handout.url}/>
                    ))
                  }
                  <></>
                </Section>
              </Item>
            </GridRow>
            <GridRow>
              <Item columns={6}>
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
                  <CreaturesTable searchTerm={creatureSearchTerm}/>
                </Section>
              </Item>
              <Item columns={6}>
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
                  <ItemsTable searchTerm={itemSearchTerm}/>
                </Section>
              </Item>
            </GridRow>
          </Grid>
        </Container>
        <Footer>
          <ToolbarFooter
            setIsSideDrawerOpen={setIsSideDrawerOpen}/>
        </Footer>
      </FooterOffset>
      <SideDrawer
        isOpen={isSideDrawerOpen}
        onClose={onSideDrawerClose}
        portalElement={document.body}
      >
        <RulesSearch/>
      </SideDrawer>
      <Modal
        isOpen={isManagePlayersModalOpen}
        onClose={handleManagePlayersModalClose}
        portalElement={document.body}>
        <form onSubmit={(e) => {
          e.preventDefault();
          newPlayersModalSubmit();
        }}>
          <h2>
            Manage Players
          </h2>
          <label htmlFor="player-name">
            Player Name
          </label>
          <Input
            full
            inputId="player-name"
            inputName="player-name"
            onChange={(e) => {
              setNewPlayerName(e.target.value);
            }}
            value={newPlayerName}/>
          <label htmlFor="character-name">
            Character Name
          </label>
          <Input
            full
            inputId="character-name"
            inputName="character-name"
            onChange={(e) => {
              setNewCharacterName(e.target.value);
            }}
            value={newCharacterName}/>
          <label htmlFor="character-ac">
            AC
          </label>
          <Input
            full
            inputId="character-ac"
            inputName="character-ac"
            onChange={(e) => {
              setNewCharacterAc(Number(e.target.value));
            }}
            value={String(newCharacterAc)}/>
          <Button
            buttonText="Add Player"
            onClick={newPlayersModalSubmit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                newPlayersModalSubmit();
              }
            }}/>
          <Button
            buttonText="Cancel"
            onClick={() => {
              handleManagePlayersModalClose();
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleManagePlayersModalClose();
              }
            }}/>
        </form>
      </Modal>
    </>
  );
};
