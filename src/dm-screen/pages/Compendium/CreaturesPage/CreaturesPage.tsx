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
  const [searchTerm, setSearchTerm] = useState<string>('');

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

  const filteredCreatures = searchTerm ? creatures.filter((creature) => creature.name.includes(searchTerm)) : creatures;

  const rows = filteredCreatures.map((creature: MarkdownEntity) => {
    const {
      id,
      name,
    } = creature;

    return {
      data: [name, id],
      actions: [
        {
          name: 'Review',
          onClick: () => {
            navigate(CREATURE_PATH.replace(':id', id));
          }
        },
        {
          name: 'Manage',
          onClick: () => {
            navigate(EDIT_CREATURE_PATH.replace(':id', id));
          }
        },
        {
          name: 'Delete',
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
        <p>
          <Link to={CREATE_CREATURE_PATH}>
            Create new creature
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
          filteredCreatures.length ? (
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
