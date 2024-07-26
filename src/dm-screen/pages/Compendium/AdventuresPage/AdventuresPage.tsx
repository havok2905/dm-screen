import {
  CenteredContainer,
  Container,
  Spinner,
  Table
} from '@designSystem/components';
import {
  Link,
  useNavigate
} from "react-router-dom";
import {
  useCallback,
  useState
} from 'react';

import { Adventure } from '@core/types';

import {
  ADVENTURE_PATH,
  CREATE_ADVENTURE_PATH,
  EDIT_ADVENTURE_PATH
} from '../../../routes';
import {
  useAdventures,
  useDestroyAdventure
} from '../../../hooks';

import {
  ConfirmationModal
} from '../../../components';

export const AdventuresPage = () => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const [activeId, setActiveId] = useState<string>('');
  
  const {
    data,
    isFetching,
    isLoading,
    isPending,
    refetch
  } = useAdventures();

  const onSuccess = useCallback(() => {
    setIsConfirmModalOpen(false);
    setActiveId('');
    refetch();
  }, [
    refetch
  ]);

  const {
    mutate: destroyAdventure
  } = useDestroyAdventure(onSuccess);

  const onCancel = useCallback(() => {
    setIsConfirmModalOpen(false);
    setActiveId('');
  }, []);

  const onOk = useCallback(() => {
    destroyAdventure(activeId);
    setIsConfirmModalOpen(false);
    setActiveId('');
  }, [
    activeId,
    destroyAdventure
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

  const adventures = data?.adventures ?? [] as Adventure[];

  const columns = [
    { name: 'Id' },
    { name: 'Name'},
    { name: 'System'}
  ];

  const rows = adventures.map((adventure: Adventure) => {
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
            navigate(ADVENTURE_PATH.replace(':id', id))
          }
        },
        {
          name: 'Edit',
          onClick: () => {
            navigate(EDIT_ADVENTURE_PATH.replace(':id', id))
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
      <Container>
        <h1>Compendium</h1>
        <h2>Adventures</h2>
        <Link to={CREATE_ADVENTURE_PATH}>
          Create new adventure
        </Link>
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
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onCancel={onCancel}
        onOk={onOk}
      />
    </>
  );
};
