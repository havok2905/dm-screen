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
  CREATURE_PATH,
  CREATURES_PATH
} from '../../../routes';
import {
  useCreature,
  useUpdateCreature
} from '../../../hooks';

import { CompendiumNavbar } from '../../../components';
import { MarkdownEntityEditPage } from '../components/MarkdownEntityEditPage';

export const EditCreaturePage = () => {
  const { id: creatureId } = useParams();

  const {
    data,
    isFetching,
    isLoading,
    isPending,
    refetch
  } = useCreature(creatureId ?? '');

  const navigate = useNavigate();

  const onSuccess = useCallback(() => {
    navigate(CREATURE_PATH.replace(':id', data?.id ?? ''));
  }, [
    data,
    navigate
  ]);

  const {
    mutate: updateCreature,
    isError: updateCreatureIsError
  } = useUpdateCreature(onSuccess);

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
        <h2>Edit Creature</h2>
        <p>
          <strong>Id:</strong> {id}
        </p>
        <p>
          <Link to={CREATURES_PATH}>
            Back to Creatures
          </Link>
        </p>
        <MarkdownEntityEditPage
          entityType="creature"
          item={data}
          refetch={refetch}
          saveButtonText="Save creature"
          updateFunction={updateCreature}
          updateIsError={updateCreatureIsError}
          updateIsErrorText="There was a problem updating this creature"
        />
      </Container>
    </>
  );
};
