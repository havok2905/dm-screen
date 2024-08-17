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
  useAdventureItem,
  useUpdateAdventureItem
} from '../../../hooks';

import { ADVENTURE_PATH } from '../../../routes';
import { EditItemForm } from '../../../components';

export const EditAdventureItemPage = () => {
  const { id: adventureItemId } = useParams();

  const {
    data,
    isFetching,
    isLoading,
    isPending
  } = useAdventureItem(adventureItemId ?? '');

  const navigate = useNavigate();

  const onSuccess = useCallback(() => {
    navigate(ADVENTURE_PATH.replace(':id', data?.adventureid ?? ''));
  }, [
    data,
    navigate
  ]);

  const {
    mutate: updateAdventureItem,
    isError: updateAdventureItemIsError
  } = useUpdateAdventureItem(onSuccess);

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
      <h2>Edit Adventure Item</h2>
      <p>
        <strong>Id:</strong> {id}
      </p>
      <p>
        <Link to={ADVENTURE_PATH.replace(':id', adventureid)}>
          Back to Adventure
        </Link>
      </p>
      <EditItemForm
        adventureItem={data}
        updateAdventureItem={updateAdventureItem}
        updateAdventureItemIsError={updateAdventureItemIsError}
      />
    </Container>
  );
};
