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
  MAGIC_ITEM_PATH,
  MAGIC_ITEMS_PATH
} from '../../../routes';
import {
  useMagicItem,
  useUpdateMagicItem
} from '../../../hooks';

import { EditMarkdownEntityForm } from '../../../components';

export const EditMagicItemPage = () => {
  const { id: magicItemId } = useParams();

  const {
    data,
    isFetching,
    isLoading,
    isPending
  } = useMagicItem(magicItemId ?? '');

  const navigate = useNavigate();

  const onSuccess = useCallback(() => {
    navigate(MAGIC_ITEM_PATH.replace(':id', data?.id ?? ''));
  }, [
    data,
    navigate
  ]);

  const {
    mutate: updateMagicItem,
    isError: updateMagicItemIsError
  } = useUpdateMagicItem(onSuccess);

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
    <Container>
      <h1>Compendium</h1>
      <h2>Edit Magic Item</h2>
      <p>
        <strong>Id:</strong> {id}
      </p>
      <p>
        <Link to={MAGIC_ITEMS_PATH}>
          Back to Magic Items
        </Link>
      </p>
      <EditMarkdownEntityForm
        item={data}
        saveButtonText="Save magic item"
        updateFunction={updateMagicItem}
        updateIsError={updateMagicItemIsError}
        updateIsErrorText="There was a problem updating this magic item"
      />
    </Container>
  );
};