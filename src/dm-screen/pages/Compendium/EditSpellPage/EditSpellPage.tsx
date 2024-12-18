import {
  CenteredContainer,
  Container,
  Spinner
} from '@designSystem/components';
import {
  Link,
  useNavigate,
  useParams
} from 'react-router-dom';

import { useCallback } from 'react';

import {
  SPELL_PATH,
  SPELLS_PATH
} from '../../../routes';
import {
  useSpell,
  useUpdateSpell
} from '../../../hooks';

import { CompendiumNavbar } from '../../../components';
import { MarkdownEntityEditPage } from '../components/MarkdownEntityEditPage';

export const EditSpellPage = () => {
  const { id: spellId } = useParams();

  const {
    data,
    isFetching,
    isLoading,
    isPending,
    refetch
  } = useSpell(spellId ?? '');

  const navigate = useNavigate();

  const onSuccess = useCallback(() => {
    navigate(SPELL_PATH.replace(':id', data?.id ?? ''));
  }, [
    data,
    navigate
  ]);

  const {
    mutate: updateSpell,
    isError: updateSpellIsError
  } = useUpdateSpell(onSuccess);

  if (
    isFetching ||
    isLoading ||
    isPending
  ) return (
    <CenteredContainer>
      <Spinner/>
    </CenteredContainer>
  );

  const {
    id
  } = data ?? {};

  return (
    <>
      <CompendiumNavbar/>
      <Container>
        <h2>Edit Spell</h2>
        <p>
          <strong>Id:</strong> {id}
        </p>
        <p>
          <Link to={SPELLS_PATH}>
            Back to Spells
          </Link>
        </p>
        <MarkdownEntityEditPage
          entityType="spell"
          item={data}
          refetch={refetch}
          saveButtonText="Save spell"
          updateFunction={updateSpell}
          updateIsError={updateSpellIsError}
          updateIsErrorText="There was a problem updating this spell"
        />
      </Container>
    </>
  );
};
