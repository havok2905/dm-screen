import {
  CenteredContainer,
  Container,
  Spinner,
  Table
} from '@designSystem/components';

import { MarkdownEntity } from '@core/types';
import { useNavigate } from 'react-router-dom';

import { CREATURE_PATH } from '../../../routes';
import { useCreatures } from '../../../hooks';

export const CreaturesPage = () => {  
  const {
    data,
    isFetching,
    isLoading,
    isPending
  } = useCreatures();

  const navigate = useNavigate();

  if (
    isFetching ||
    isLoading ||
    isPending
  ) return (
    <CenteredContainer>
      <Spinner/>
    </CenteredContainer>
  );

  const creatures = data ?? [] as MarkdownEntity[];

  const columns = [
    { name: 'Name'},
    { name: 'Id' }
  ];

  const rows = creatures.map((creature: MarkdownEntity) => {
    const {
      id,
      name,
    } = creature;

    return {
      data: [name, id],
      actions: [
        {
          name: 'View',
          onClick: () => {
            navigate(CREATURE_PATH.replace(':id', id));
          }
        },
        {
          name: 'Edit',
          onClick: () => {
            // TODO
          }
        },
        {
          name: 'Destroy',
          onClick: () => {
            // TODO
          }
        }
      ]
    };
  });

  return (
    <>
      <Container>
        <h1>Compendium</h1>
        <h2>Creatures</h2>
        {
          creatures.length ? (
            <Table
              columns={columns}
              rows={rows}
            />
          ) : (
            <p>
              No creatures were found.
            </p>
          )
        }
      </Container>
    </>
  );
};
