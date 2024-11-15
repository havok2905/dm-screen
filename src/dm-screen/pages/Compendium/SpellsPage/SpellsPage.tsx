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
  CREATE_SPELL_PATH,
  EDIT_SPELL_PATH,
  SPELL_PATH
} from '../../../routes';
import {
  useDestroySpell,
  useSpells
} from '../../../hooks';

export const SpellsPage = () => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const [activeId, setActiveId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const {
    data,
    isFetching,
    isLoading,
    isPending,
    refetch
  } = useSpells();

  const onSuccess = useCallback(() => {
    setIsConfirmModalOpen(false);
    setActiveId('');
    refetch();
  }, [
    refetch
  ]);

  const {
    mutate: destroySpell
  } = useDestroySpell(onSuccess);

  const onCancel = useCallback(() => {
    setIsConfirmModalOpen(false);
    setActiveId('');
  }, []);

  const onOk = useCallback(() => {
    destroySpell(activeId);
    setIsConfirmModalOpen(false);
    setActiveId('');
  }, [
    activeId,
    destroySpell
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

  const spells = data ?? [] as MarkdownEntity[];

  const columns = [
    { name: 'Name'},
    { name: 'Id' }
  ];

  const filteredSpells = searchTerm ? spells.filter((spell) => spell.name.includes(searchTerm)) : spells;

  const rows = filteredSpells.map((spell: MarkdownEntity) => {
    const {
      id,
      name,
    } = spell;

    return {
      data: [name, id],
      actions: [
        {
          name: 'Review',
          onClick: () => {
            navigate(SPELL_PATH.replace(':id', id));
          }
        },
        {
          name: 'Manage',
          onClick: () => {
            navigate(EDIT_SPELL_PATH.replace(':id', id));
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
        <h2>Spells</h2>
        <p>
          <Link to={CREATE_SPELL_PATH}>
            Create new spell
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
          filteredSpells.length ? (
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
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onCancel={onCancel}
        onOk={onOk}
      />
    </>
  );
};
