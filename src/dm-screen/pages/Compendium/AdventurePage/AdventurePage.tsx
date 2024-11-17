import {
  Adventure,
  Handout,
  MarkdownEntity
} from '@core/types';
import {
  Button,
  CenteredContainer,
  Container,
  Grid,
  GridRow,
  Item,
  Spinner,
  Table
} from '@designSystem/components';
import {
  Link,
  useParams
} from 'react-router-dom';

import { useState } from 'react';

import {
  CompendiumNavbar,
  Markdown
} from '../../../components';

import { ADVENTURES_PATH } from '../../../routes';
import { useAdventure } from '../../../hooks';

import './AdventurePage.css';

export const AdventurePage = () => {
  const { id: adventureId } = useParams();
  const [currentCreaturesExpanded, setCurrentCreaturesExpanded] = useState<string[]>([]); 
  const [currentItemsExpanded, setCurrentItemsExpanded] = useState<string[]>([]);

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
    splashImgSrc,
    system
  } = data ?? {} as Adventure;

  const toggleItem = (
    id: string,
    isExpanded: boolean
  ) => {
    if (isExpanded) {
      setCurrentItemsExpanded(currentItemsExpanded.filter((i) => {
        return i !== id;
      }));
    } else {
      setCurrentItemsExpanded([
        ...currentItemsExpanded,
        id
      ]);
    }
  };

  const toggleCreature = (
    id: string,
    isExpanded: boolean
  ) => {
    if (isExpanded) {
      setCurrentCreaturesExpanded(currentCreaturesExpanded.filter((c) => {
        return c !== id;
      }));
    } else {
      setCurrentCreaturesExpanded([
        ...currentCreaturesExpanded,
        id
      ]);
    }
  };

  const creatureColumns = [
    { name: 'Id' },
    { name: 'Name'}
  ];

  const creatureRows = creatures?.map((creature: MarkdownEntity) => {
    const {
      content,
      id,
      image,
      metadata,
      name
    } = creature;

    const isExpanded = currentCreaturesExpanded.includes(id);

    return {
      data: [id, name],
      actions: [
        {
          name: isExpanded ? 'Collapse' : 'Expand',
          onClick: () => {
            toggleCreature(id, isExpanded);
          }
        }
      ],
      collapsibleRenderer: () => {
        return (
          <div>
            {
              metadata.map((m, index) => {
                return (
                  <p key={index}>
                    {m.name}: {m.value}
                  </p>
                );
              })
            }
            {
              image ? <img alt={name} src={image}/> : null
            }
            <Markdown content={content} />
          </div>
        )
      },
      isExpanded
    };
  });

  const itemColumns = [
    { name: 'Id' },
    { name: 'Name'}
  ];

  const itemRows = items?.map((item: MarkdownEntity) => {
    const {
      content,
      id,
      image,
      metadata,
      name
    } = item;

    const isExpanded = currentItemsExpanded.includes(id);

    return {
      data: [id, name],
      actions: [
        {
          name: isExpanded ? 'Collapse' : 'Expand',
          onClick: () => {
            toggleItem(id, isExpanded);
          }
        }
      ],
      collapsibleRenderer: () => {
        return (
          <div>
            {
              metadata.map((m, index) => {
                return (
                  <p key={index}>
                    {m.name}: {m.value}
                  </p>
                );
              })
            }
            {
              image ? <img alt={name} src={image} style={{ maxWidth: '100%' }}/> : null
            }
            <Markdown content={content} />
          </div>
        )
      },
      isExpanded
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
              Splash Image
            </h3>
            {
              splashImgSrc ? (
                <img
                  src={splashImgSrc}
                  style={{
                    maxWidth: '100%'
                  }}
                />
              ) : null
            }
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
                    <p>
                      {description}
                    </p>
                    <fieldset>
                      <Button
                        buttonText="Copy image path"
                        onClick={() => {
                          navigator.clipboard.writeText(url);
                          alert(`Copied ${url} to clipboard`);
                        }}
                      />
                    </fieldset>
                    <img 
                      alt={description}
                      className="adventure-page-handout-image"
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
    <>
      <CompendiumNavbar/>
      <Container>
        <p>
          <Link to={ADVENTURES_PATH}>
            Back to Adventures
          </Link>
        </p>
        {
          adventureContent
        }
      </Container>
    </>
  );
};
