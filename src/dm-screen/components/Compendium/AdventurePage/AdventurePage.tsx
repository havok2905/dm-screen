import {
  Adventure,
  Handout,
  MarkdownEntity
} from '@core/types';
import {
  Container,
  Grid,
  GridRow,
  Item,
  Table
} from '@designSystem/components';

import { Link } from 'react-router-dom';

import { ADVENTURES_PATH } from '../../../routes';
import { Markdown } from '../../Markdown';
import { useAdventure } from '../../../hooks';

export const AdventurePage = () => {
  const {
    data,
    isFetching,
    isLoading,
    isPending
  } = useAdventure('68c8bd92-04ff-4359-9856-8d2d6b02b69b');

  if (
    isFetching ||
    isLoading ||
    isPending
  ) return null;

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
            <Markdown content={notes}/>
          </Item>
        </GridRow>
      </Grid>
    </>
  ) : null;

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
