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
  useAdventureCreature,
  useUpdateAdventureCreature
} from '../../../hooks';

import { CompendiumNavbar } from '../../../components';
import { MarkdownEntityEditPage } from '../components/MarkdownEntityEditPage';

import { ADVENTURE_PATH } from '../../../routes';

export const EditAdventureCreaturePage = () => {
  const { id: adventureCreatureId } = useParams();

  const {
    data,
    isFetching,
    isLoading,
    isPending,
    refetch
  } = useAdventureCreature(adventureCreatureId ?? '');

  const navigate = useNavigate();

  const onSuccess = useCallback(() => {
    navigate(ADVENTURE_PATH.replace(':id', data?.adventureid ?? ''));
  }, [
    data,
    navigate
  ]);

  const {
    mutate: updateAdventureCreature,
    isError: updateAdventureCreatureIsError
  } = useUpdateAdventureCreature(onSuccess);

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
    adventureid,
    id
  } = data ?? {};

  return (
    <>
      <CompendiumNavbar/>
      <Container>
        <h2>Edit Adventure Creature</h2>
        <p>
          <strong>Id:</strong> {id}
        </p>
        <p>
          <Link to={ADVENTURE_PATH.replace(':id', adventureid)}>
            Back to Adventure
          </Link>
        </p>
        <MarkdownEntityEditPage
          entityType="adventure-creature"
          item={data}
          refetch={refetch}
          saveButtonText="Save adventure creature"
          updateFunction={updateAdventureCreature}
          updateIsError={updateAdventureCreatureIsError}
          updateIsErrorText="There was a problem updating this adventure creature"
        />
      </Container>
    </>
  );
};
