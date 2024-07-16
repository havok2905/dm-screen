import {
  Container,
  Table
} from '@designSystem/components';

import { Adventure } from '@core/types';
import { useNavigate } from "react-router-dom";

import { ADVENTURE_PATH } from '../../../routes';
import { useAdventures } from '../../../hooks';

export const AdventuresPage = () => {
  const {
    data,
    isFetching,
    isLoading,
    isPending
  } = useAdventures();

  const navigate = useNavigate();

  if (
    !data ||
    isFetching ||
    isLoading ||
    isPending
  ) return null;

  const adventures = data.adventures as Adventure[];

  const columns = [
    { name: 'Id' },
    { name: 'Name'},
    { name: 'System'}
  ];

  const rows = adventures.map(adventure => {
    const {
      id,
      name,
      system
    } = adventure;

    return {
      data: [id, name, system],
      actions: [
        {
          name: 'View',
          onClick: () => {
            navigate(ADVENTURE_PATH)
          }
        }
      ]
    };
  });

  return (
    <Container>
      <h1>Compendium</h1>
      <h2>Adventures</h2>
      {
        adventures.length ? (
          <Table
            columns={columns}
            rows={rows}
          />
        ) : (
          <p>
            No adventures were found.
          </p>
        )
      }
    </Container>
  );
};
