import {
  CenteredContainer,
  Container,
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
  CREATE_CREATURE_PATH,
  CREATURE_PATH,
  EDIT_CREATURE_PATH
} from '../../../routes';
import {
  useCreatures,
  useDestroyCreature
} from '../../../hooks';

export const CreaturesPage = () => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const [activeId, setActiveId] = useState<string>('');

  const {
    data,
    isFetching,
    isLoading,
    isPending,
    refetch
  } = useCreatures();

  const onSuccess = useCallback(() => {
    setIsConfirmModalOpen(false);
    setActiveId('');
    refetch();
  }, [
    refetch
  ]);

  const {
    mutate: destroyCreature
  } = useDestroyCreature(onSuccess);

  const onCancel = useCallback(() => {
    setIsConfirmModalOpen(false);
    setActiveId('');
  }, []);

  const onOk = useCallback(() => {
    destroyCreature(activeId);
    setIsConfirmModalOpen(false);
    setActiveId('');
  }, [
    activeId,
    destroyCreature
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
            navigate(EDIT_CREATURE_PATH.replace(':id', id));
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
        <h2>Creatures</h2>
        <Link to={CREATE_CREATURE_PATH}>
          Create new creature
        </Link>
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
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onCancel={onCancel}
        onOk={onOk}
      />
    </>
  );
};
