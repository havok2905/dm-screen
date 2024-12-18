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
  EQUIPMENT_ITEM_PATH,
  EQUIPMENT_ITEMS_PATH
} from '../../../routes';
import {
  useEquipmentItem,
  useUpdateEquipmentItem
} from '../../../hooks';

import { CompendiumNavbar } from '../../../components';
import { MarkdownEntityEditPage } from '../components/MarkdownEntityEditPage';

export const EditEquipmentItemPage = () => {
  const { id: equipmentItemId } = useParams();

  const {
    data,
    isFetching,
    isLoading,
    isPending,
    refetch
  } = useEquipmentItem(equipmentItemId ?? '');

  const navigate = useNavigate();

  const onSuccess = useCallback(() => {
    navigate(EQUIPMENT_ITEM_PATH.replace(':id', data?.id ?? ''));
  }, [
    data,
    navigate
  ]);

  const {
    mutate: updateEquipmentItem,
    isError: updateEquipmentItemIsError
  } = useUpdateEquipmentItem(onSuccess);

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
        <h2>Edit Equipment Item</h2>
        <p>
          <strong>Id:</strong> {id}
        </p>
        <p>
          <Link to={EQUIPMENT_ITEMS_PATH}>
            Back to Equipment Items
          </Link>
        </p>
        <MarkdownEntityEditPage
          entityType="equipment-item"
          item={data}
          refetch={refetch}
          saveButtonText="Save equipment item"
          updateFunction={updateEquipmentItem}
          updateIsError={updateEquipmentItemIsError}
          updateIsErrorText="There was a problem updating this equipment item"
        />
      </Container>
    </>
  );
};
