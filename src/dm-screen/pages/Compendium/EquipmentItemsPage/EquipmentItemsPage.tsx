import {
  CenteredContainer,
  Container,
  Spinner,
  Table
} from '@designSystem/components';

import { MarkdownEntity } from '@core/types';
import { useNavigate } from 'react-router-dom';

import { EQUIPMENT_ITEM_PATH } from '../../../routes';
import { useEquipmentItems } from '../../../hooks';

export const EquipmentItemsPage = () => {  
  const {
    data,
    isFetching,
    isLoading,
    isPending
  } = useEquipmentItems();

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

  const items = data ?? [] as MarkdownEntity[];

  const columns = [
    { name: 'Name'},
    { name: 'Id' }
  ];

  const rows = items.map((item: MarkdownEntity) => {
    const {
      id,
      name,
    } = item;

    return {
      data: [name, id],
      actions: [
        {
          name: 'View',
          onClick: () => {
            navigate(EQUIPMENT_ITEM_PATH.replace(':id', id));
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
        <h2>Equipment Items</h2>
        {
          items.length ? (
            <Table
              columns={columns}
              rows={rows}
            />
          ) : (
            <p>
              No items were found.
            </p>
          )
        }
      </Container>
    </>
  );
};
