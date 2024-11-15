import { EQUIPMENT_ITEM_METADATA } from '@templates/metadata/equipmentItem';
import { EQUIPMENT_ITEM_TEMPLATE } from '@templates/markdown/equipmentItem';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { MarkdownEntityCreatePage } from '../components/MarkdownEntityCreatePage';
import { useCreateEquipmentItem } from '../../../hooks';

import {
  EDIT_EQUIPMENT_ITEM_PATH,
  EQUIPMENT_ITEMS_PATH
} from '../../../routes';

export const CreateEquipmentItemPage = () => {
  const navigate = useNavigate();

  const onSuccess = useCallback((id: string) => {
    navigate(EDIT_EQUIPMENT_ITEM_PATH.replace(':id', id));
  }, [
    navigate
  ]);

  const {
    isError,
    mutate
  } = useCreateEquipmentItem(onSuccess);

  return(
      <MarkdownEntityCreatePage
        backToLinkPath={EQUIPMENT_ITEMS_PATH}
        backToLinkString="Back to equipment items"
        createIsError={isError}
        createIsErrorText="There was an error saving this equipment item"
        initialMetaData={EQUIPMENT_ITEM_METADATA}
        saveButtonText="Save equipment item"
        template={EQUIPMENT_ITEM_TEMPLATE}
        titleString="Create New Equipment Item"
        updateFunction={mutate}
      />
  );
};
