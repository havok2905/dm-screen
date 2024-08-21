import {
  CenteredContainer,
  Container,
  Spinner,
  Table
} from '@designSystem/components';

import { MarkdownEntity } from '@core/types';
import { useNavigate } from 'react-router-dom';

import { SPELL_PATH } from '../../../routes';
import { useSpells } from '../../../hooks';

export const SpellsPage = () => {  
  const {
    data,
    isFetching,
    isLoading,
    isPending
  } = useSpells();

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

  const spells = data ?? [] as MarkdownEntity[];

  const columns = [
    { name: 'Name'},
    { name: 'Id' }
  ];

  const rows = spells.map((spell: MarkdownEntity) => {
    const {
      id,
      name,
    } = spell;

    return {
      data: [name, id],
      actions: [
        {
          name: 'View',
          onClick: () => {
            navigate(SPELL_PATH.replace(':id', id));
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
        <h2>Spells</h2>
        {
          spells.length ? (
            <Table
              columns={columns}
              rows={rows}
            />
          ) : (
            <p>
              No spells were found.
            </p>
          )
        }
      </Container>
    </>
  );
};
