import {
  CenteredContainer,
  Container,
  Input,
  Spinner,
  Table
} from '@designSystem/components';
import {
  Link,
  useNavigate
} from 'react-router-dom';
import {
  useCallback,
  useState
} from 'react';

import { MarkdownEntity } from '@core/types';

import {
  CompendiumNavbar,
  ConfirmationModal
} from '../../../components';
import {
  CREATE_EQUIPMENT_ITEM_PATH,
  EDIT_EQUIPMENT_ITEM_PATH,
  EQUIPMENT_ITEM_PATH
} from '../../../routes';
import {
  useDestroyEquipmentItem,
  useEquipmentItems
} from '../../../hooks';

export const EquipmentItemsPage = () => {  
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const [activeId, setActiveId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const {
    data,
    isFetching,
    isLoading,
    isPending,
    refetch
  } = useEquipmentItems();

  const onSuccess = useCallback(() => {
    setIsConfirmModalOpen(false);
    setActiveId('');
    refetch();
  }, [
    refetch
  ]);

  const {
    mutate: destroyEquipmentItem
  } = useDestroyEquipmentItem(onSuccess);

  const onCancel = useCallback(() => {
    setIsConfirmModalOpen(false);
    setActiveId('');
  }, []);

  const onOk = useCallback(() => {
    destroyEquipmentItem(activeId);
    setIsConfirmModalOpen(false);
    setActiveId('');
  }, [
    activeId,
    destroyEquipmentItem
  ]);

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

  const filteredItems = searchTerm ? items.filter((item) => item.name.includes(searchTerm)) : items;

  const rows = filteredItems.map((item: MarkdownEntity) => {
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
            navigate(EDIT_EQUIPMENT_ITEM_PATH.replace(':id', id))
          }
        },
        {
          name: 'Destroy',
          onClick: () => {
            setIsConfirmModalOpen(true);
            setActiveId(id);
          }
        }
      ]
    };
  });

  return (
    <>
      <CompendiumNavbar/>
      <Container>
        <h2>Equipment Items</h2>
        <p>
          <Link to={CREATE_EQUIPMENT_ITEM_PATH}>
            Create new equipment item
          </Link>
        </p>
        <Input
          full
          inputId="search"
          inputName="search"
          label="Search"
          onChange={(e) => {
            setSearchTerm(e.target.value)
          }}
          value={searchTerm}
        />
        {
          filteredItems.length ? (
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
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onCancel={onCancel}
        onOk={onOk}
      />
    </>
  );
};
