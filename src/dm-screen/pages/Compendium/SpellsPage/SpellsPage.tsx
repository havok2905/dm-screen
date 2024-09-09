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
            navigate(EDIT_SPELL_PATH.replace(':id', id));
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
        <h2>Spells</h2>
        <Link to={CREATE_SPELL_PATH}>
          Create new spell
        </Link>
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
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onCancel={onCancel}
        onOk={onOk}
      />
    </>
  );
};
