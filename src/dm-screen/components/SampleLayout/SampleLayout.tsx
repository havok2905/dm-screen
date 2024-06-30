import {
  Button,
  Grid,
  GridRow,
  Input,
  Item,
  Section,
  SideDrawer,
  Table
} from '@designSystem/components';
import {useState} from 'react';

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
      <button onClick={() => {
        setIsSideDrawerOpen(true);
      }}>
        Open
      </button>
      <Grid>
        <GridRow>
          <Item columns={6}>
            <Section
              sectionActions={addPlayerCharacterButton}
              sectionHeaderEl="h2"
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
              sectionHeaderEl="h2"
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
              sectionHeaderEl="h2"
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
              sectionHeaderEl="h2"
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
      <SideDrawer
        isOpen={isSideDrawerOpen}
        onClose={onSideDrawerClose}
        portalElement={document.body}
      >
        <h3>Rules Dictionary</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non enim praesent elementum facilisis leo vel fringilla. Sed arcu non odio euismod lacinia at. Quam lacus suspendisse faucibus interdum posuere lorem ipsum. Id nibh tortor id aliquet lectus proin nibh nisl condimentum. Nulla facilisi nullam vehicula ipsum. Laoreet suspendisse interdum consectetur libero. Amet nisl purus in mollis nunc. Scelerisque mauris pellentesque pulvinar pellentesque. Ut morbi tincidunt augue interdum velit euismod in pellentesque massa. Tellus cras adipiscing enim eu turpis egestas pretium aenean. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt. In nulla posuere sollicitudin aliquam ultrices sagittis orci a. Urna duis convallis convallis tellus id interdum velit laoreet. Maecenas pharetra convallis posuere morbi leo urna. Cursus in hac habitasse platea dictumst. Quam lacus suspendisse faucibus interdum posuere lorem ipsum. Sed felis eget velit aliquet sagittis. Nullam vehicula ipsum a arcu cursus vitae congue.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non enim praesent elementum facilisis leo vel fringilla. Sed arcu non odio euismod lacinia at. Quam lacus suspendisse faucibus interdum posuere lorem ipsum. Id nibh tortor id aliquet lectus proin nibh nisl condimentum. Nulla facilisi nullam vehicula ipsum. Laoreet suspendisse interdum consectetur libero. Amet nisl purus in mollis nunc. Scelerisque mauris pellentesque pulvinar pellentesque. Ut morbi tincidunt augue interdum velit euismod in pellentesque massa. Tellus cras adipiscing enim eu turpis egestas pretium aenean. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt. In nulla posuere sollicitudin aliquam ultrices sagittis orci a. Urna duis convallis convallis tellus id interdum velit laoreet. Maecenas pharetra convallis posuere morbi leo urna. Cursus in hac habitasse platea dictumst. Quam lacus suspendisse faucibus interdum posuere lorem ipsum. Sed felis eget velit aliquet sagittis. Nullam vehicula ipsum a arcu cursus vitae congue.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non enim praesent elementum facilisis leo vel fringilla. Sed arcu non odio euismod lacinia at. Quam lacus suspendisse faucibus interdum posuere lorem ipsum. Id nibh tortor id aliquet lectus proin nibh nisl condimentum. Nulla facilisi nullam vehicula ipsum. Laoreet suspendisse interdum consectetur libero. Amet nisl purus in mollis nunc. Scelerisque mauris pellentesque pulvinar pellentesque. Ut morbi tincidunt augue interdum velit euismod in pellentesque massa. Tellus cras adipiscing enim eu turpis egestas pretium aenean. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt. In nulla posuere sollicitudin aliquam ultrices sagittis orci a. Urna duis convallis convallis tellus id interdum velit laoreet. Maecenas pharetra convallis posuere morbi leo urna. Cursus in hac habitasse platea dictumst. Quam lacus suspendisse faucibus interdum posuere lorem ipsum. Sed felis eget velit aliquet sagittis. Nullam vehicula ipsum a arcu cursus vitae congue.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non enim praesent elementum facilisis leo vel fringilla. Sed arcu non odio euismod lacinia at. Quam lacus suspendisse faucibus interdum posuere lorem ipsum. Id nibh tortor id aliquet lectus proin nibh nisl condimentum. Nulla facilisi nullam vehicula ipsum. Laoreet suspendisse interdum consectetur libero. Amet nisl purus in mollis nunc. Scelerisque mauris pellentesque pulvinar pellentesque. Ut morbi tincidunt augue interdum velit euismod in pellentesque massa. Tellus cras adipiscing enim eu turpis egestas pretium aenean. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt. In nulla posuere sollicitudin aliquam ultrices sagittis orci a. Urna duis convallis convallis tellus id interdum velit laoreet. Maecenas pharetra convallis posuere morbi leo urna. Cursus in hac habitasse platea dictumst. Quam lacus suspendisse faucibus interdum posuere lorem ipsum. Sed felis eget velit aliquet sagittis. Nullam vehicula ipsum a arcu cursus vitae congue.
        </p>
      </SideDrawer>
    </>
  );
};