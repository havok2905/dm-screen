import {
  Adventure,
  Handout,
  MarkdownEntity
} from '@core/types';
import {
  CenteredContainer,
  Container,
  Grid,
  GridRow,
  Item,
  Spinner,
  Table
} from '@designSystem/components';

import { Link, useParams } from 'react-router-dom';

import { ADVENTURES_PATH } from '../../../routes';
import { Markdown } from '../../../components';
import { useAdventure } from '../../../hooks';

export const AdventurePage = () => {
  const { id: adventureId } = useParams();

  const {
    data,
    isFetching,
    isLoading,
    isPending
  } = useAdventure(adventureId ?? '');

  if (
    isFetching ||
    isLoading ||
    isPending
  ) return (
    <CenteredContainer>
      <Spinner/>
    </CenteredContainer>
  );

  const {
    creatures,
    id,
    items,
    handouts,
    name,
    notes,
    system
  } = data ?? {} as Adventure;

  const creatureColumns = [
    { name: 'Id' },
    { name: 'Name'}
  ];

  const creatureRows = creatures?.map((creature: MarkdownEntity) => {
    const {
      id,
      name
    } = creature;

    return {
      data: [id, name],
      actions: [
        {
          name: 'View'
        },
        {
          name: 'Edit'
        },
        {
          name: 'Remove'
        }
      ]
    };
  });

  const itemColumns = [
    { name: 'Id' },
    { name: 'Name'}
  ];

  const itemRows = items?.map((item: MarkdownEntity) => {
    const {
      id,
      name
    } = item;

    return {
      data: [id, name],
      actions: [
        {
          name: 'View'
        },
        {
          name: 'Edit'
        },
        {
          name: 'Remove'
        }
      ]
    };
  });

  const adventureContent = data ? (
    <>
      <h2>
        {name}
      </h2>
      <p>
        <strong>ID:</strong> {id}
      </p>
      <p>
        <strong>System:</strong> {system}
      </p>
      <hr/>
      <Grid>
        <GridRow>
          <Item columns={6}>
            <h3>
              Creatures
            </h3>
            <Table
              columns={creatureColumns}
              rows={creatureRows}
            />
            <h3>
              Items
            </h3>
            <Table
              columns={itemColumns}
              rows={itemRows}
            />
            <h3>
              Handouts
            </h3>
            {
              handouts.map((handout: Handout) => {
                const {
                  description,
                  id,
                  name,
                  url
                } = handout;
                return (
                  <>
                    <h4>
                      {name}
                    </h4>
                    <img 
                      alt={description}
                      key={id}
                      src={url}
                      style={{
                        maxWidth: '100%'
                      }}
                    />
                  </>
                )
              })
            }
          </Item>
          <Item columns={6}>
            <Markdown content={notes ?? ''}/>
          </Item>
        </GridRow>
      </Grid>
    </>
  ) : (
    <p>
      No adventure could be found for {adventureId}.
    </p>
  );

  return (
    <Container>
      <h1>
        Compendium
      </h1>
      <p>
        <Link to={ADVENTURES_PATH}>
          Back to Adventures
        </Link>
      </p>
      {
        adventureContent
      }
    </Container>
  );
};
