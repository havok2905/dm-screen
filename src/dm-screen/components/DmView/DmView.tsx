import {
  ChangeEvent,
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
  LinkButton,
  Section,
  SideDrawer,
  Table
} from '@designSystem/components';
import { AdventureContext } from '../AdventureContext';
import { CreaturesTable } from '../CreaturesTable';
import { InitiativeCard } from '../InitiativeCard';
import { ItemsTable } from '../ItemsTable';
import { PlayersContext } from '../PlayersContext';
import { RulesSearch } from '../RulesSearch';
import { ToolbarFooter } from '../ToolbarFooter';

export const DmView = () => {
  const [creatureSearchTerm, setCreatureSearchTerm] = useState('');
  const [itemSearchTerm, setItemSearchTerm] = useState('');
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);

  const adventure = useContext(AdventureContext);
  const players = useContext(PlayersContext);

  const onSideDrawerClose = () => {
    setIsSideDrawerOpen(false);
  };

  const handleOnCreatureChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCreatureSearchTerm(value);
  }

  const handleOnItemChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setItemSearchTerm(value);
  }

  const addPlayerCharacterButton = (
    <Button buttonText="Add all"/>
  );

  return (
    <>
      <FooterOffset>
        <div style={{
          backgroundColor: '#111111',
          marginBottom: '40px'
        }}>
          <div style={{
            display: 'flex',
            width: '100%'
          }}>
            <InitiativeCard
              ac={10}
              characterName="Victoria Faerith"
              hp={39}
              initiativeRoll={12}
            />
            <InitiativeCard
              ac={10}
              characterName="Victoria Faerith"
              hp={39}
              initiativeRoll={12}
            />
            <InitiativeCard
              ac={10}
              characterName="Victoria Faerith"
              hp={39}
              initiativeRoll={12}
            />
            <InitiativeCard
              ac={10}
              characterName="Victoria Faerith"
              hp={39}
              initiativeRoll={12}
            />
            <InitiativeCard
              ac={10}
              characterName="Victoria Faerith"
              hp={39}
              initiativeRoll={12}
            />
            <InitiativeCard
              ac={10}
              characterName="Victoria Faerith"
              hp={39}
              initiativeRoll={12}
            />
          </div>
          <div style={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
            padding: '20px'
          }}>
            <div>
              <Button buttonText="Prev"/>
              <Button buttonText="Next"/>
              <Button buttonText="Sort"/>
            </div>
            <div>
              <LinkButton
                buttonText="Start New Combat"
                color="green"/>
            </div>
          </div>
        </div>
        <Container>
          <Grid>
            <GridRow>
              <Item columns={6}>
                <Section
                  sectionActions={addPlayerCharacterButton}
                  sectionHeaderEl="h3"
                  sectionTitle="Player Characters">
                  <Table
                    columns={[
                      { name: 'Player' },
                      { name: 'Character' },
                      { name: 'AC' },
                    ]}
                    rows={
                      players.map((player) => {
                        return {
                          data: [
                            player.name,
                            player.characterName,
                            player.ac
                          ],
                          actions: []
                        };
                      })
                    }
                  />
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
    </>
  );
};
