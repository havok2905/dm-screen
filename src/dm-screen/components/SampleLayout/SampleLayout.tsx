import { useState } from 'react';
import {
  Button,
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
import { InitiativeCard } from '../InitiativeCard';
import { RulesSearch } from '../RulesSearch';
import { ToolbarFooter } from '../ToolbarFooter';

export const SampleLayout = () => {
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);

  const onSideDrawerClose = () => {
    setIsSideDrawerOpen(false);
  };

  const addPlayerCharacterButton = (
    <Button buttonText="Add"/>
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
            padding: '10px'
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
              <LinkButton
                buttonText="End Combat"
                color="red"/>
            </div>
          </div>
        </div>
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
                  rows={[
                    {
                      data: ['Johnathan Doe', 'Eryn Sylveren', 12],
                      actions: []
                    },
                    {
                      data: ['John Smith', 'Victoria Faerith', 16],
                      actions: []
                    },
                    {
                      data: ['Gilbert Godfried', 'Simon Evans', 10],
                      actions: []
                    },
                    {
                      data: ['Kevin Smith', 'Aamon Ortis', 11],
                      actions: []
                    },
                    {
                      data: ['Christopher Perkins', 'Ella Olkereth', 13],
                      actions: []
                    },
                    {
                      data: ['John Carpenter', 'Daagon', 18],
                      actions: []
                    }
                  ]}
                />
              </Section>
            </Item>
            <Item columns={6}>
              <Section
                sectionHeaderEl="h3"
                sectionTitle="Handouts">
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
                    inputName="creatures"/>
                )}
                sectionHeaderEl="h3"
                sectionTitle="Creatures">
                <Table
                  columns={[
                    { name: 'Creature' },
                    { name: 'Type' },
                    { name: 'AC' },
                    { name: 'HP' },
                    { name: 'CR' },
                  ]}
                  rows={[
                    {
                      data: ['Adult Red Dragon', 'Dragon', 12, 112, '8'],
                      actions: [
                        {
                          name: 'Add',
                          onClick(e, rowData) {
                            console.log(e, rowData);
                          },
                        }
                      ]
                    },
                    {
                      data: ['Ghost', 'Undead', 13, 59, '4'],
                      actions: [
                        {
                          name: 'Add',
                          onClick(e) {
                            console.log(e);
                          },
                        }
                      ]
                    },
                    {
                      data: ['Ghast', 'Undead', 12, 18, '1'],
                      actions: [
                        {
                          name: 'Add',
                          onClick(e) {
                            console.log(e);
                          },
                        }
                      ]
                    },
                    {
                      data: ['Mind FLayer', 'Aberration', 16, 69, '8'],
                      actions: [
                        {
                          name: 'Add',
                          onClick(e) {
                            console.log(e);
                          },
                        }
                      ]
                    },
                    {
                      data: ['Giant Rat', 'Beast', 13, 12, '1/4'],
                      actions: [
                        {
                          name: 'Add',
                          onClick(e) {
                            console.log(e);
                          },
                        }
                      ]
                    },
                    {
                      data: ['Giant Crab', 'Beast', 18, 11, '1/8'],
                      actions: [
                        {
                          name: 'Add',
                          onClick(e) {
                            console.log(e);
                          },
                        }
                      ]
                    }
                  ]}
                />
              </Section>
            </Item>
            <Item columns={6}>
              <Section
                sectionActions={(
                  <Input
                    inputId="items"
                    inputName="items"/>
                )}
                sectionHeaderEl="h3"
                sectionTitle="Items">
                <Table
                  columns={[
                    { name: 'Item' },
                    { name: 'Rarity' },
                    { name: 'Cost' }
                  ]}
                  rows={[
                    {
                      data: ['Potion of Healing', 'Common', '100gp'],
                      actions: [
                        {
                          name: 'View',
                          onClick(e) {
                            console.log(e);
                          },
                        }
                      ]
                    },
                    {
                      data: ['Potion of Healing', 'Common', '100gp'],
                      actions: [
                        {
                          name: 'View',
                          onClick(e) {
                            console.log(e);
                          },
                        }
                      ]
                    },
                    {
                      data: ['Potion of Healing', 'Common', '100gp'],
                      actions: [
                        {
                          name: 'View',
                          onClick(e) {
                            console.log(e);
                          },
                        }
                      ]
                    },
                    {
                      data: ['Potion of Healing', 'Common', '100gp'],
                      actions: [
                        {
                          name: 'View',
                          onClick(e) {
                            console.log(e);
                          },
                        }
                      ]
                    },
                    {
                      data: ['Potion of Healing', 'Common', '100gp'],
                      actions: [
                        {
                          name: 'View',
                          onClick(e) {
                            console.log(e);
                          },
                        }
                      ]
                    },
                    {
                      data: ['Potion of Healing', 'Common', '100gp'],
                      actions: [
                        {
                          name: 'View',
                          onClick(e) {
                            console.log(e);
                          },
                        }
                      ]
                    }
                  ]}
                />
              </Section>
            </Item>
          </GridRow>
        </Grid>
        <Footer>
          <ToolbarFooter setIsSideDrawerOpen={setIsSideDrawerOpen}/>
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
