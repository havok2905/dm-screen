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

import { ADVENTURE_PATH } from '../../../routes';
import { EditCreatureForm } from '../../../components/EditCreatureForm';

export const EditAdventureCreaturePage = () => {
  const { id: adventureCreatureId } = useParams();

  const {
    data,
    isFetching,
    isLoading,
    isPending
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
    <Container>
      <h1>Compendium</h1>
      <h2>Edit Adventure Creature</h2>
      <p>
        <strong>Id:</strong> {id}
      </p>
      <p>
        <Link to={ADVENTURE_PATH.replace(':id', adventureid)}>
          Back to Adventure
        </Link>
      </p>
      <EditCreatureForm
        adventureCreature={data}
        updateAdventureCreature={updateAdventureCreature}
        updateAdventureCreatureIsError={updateAdventureCreatureIsError}
      />
    </Container>
  );
};
