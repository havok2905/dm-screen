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

import { CompendiumNavbar } from '../../../components';
import { MarkdownEntityEditPage } from '../components/MarkdownEntityEditPage';

import { ADVENTURE_PATH } from '../../../routes';

export const EditAdventureItemPage = () => {
  const { id: adventureItemId } = useParams();

  const {
    data,
    isFetching,
    isLoading,
    isPending,
    refetch
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
    <>
      <CompendiumNavbar/>
      <Container>
        <h2>Edit Adventure Item</h2>
        <p>
          <strong>Id:</strong> {id}
        </p>
        <p>
          <Link to={ADVENTURE_PATH.replace(':id', adventureid)}>
            Back to Adventure
          </Link>
        </p>
        <MarkdownEntityEditPage
          entityType="adventure-item"
          item={data}
          refetch={refetch}
          saveButtonText="Save adventure item"
          updateFunction={updateAdventureItem}
          updateIsError={updateAdventureItemIsError}
          updateIsErrorText="There was a problem updating this Adventure Item"
        />
      </Container>
    </>
  );
};
