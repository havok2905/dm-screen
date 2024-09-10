import { MAGIC_ITEM_METADATA } from '@templates/metadata/magicItem';
import { MAGIC_ITEM_TEMPLATE } from '@templates/markdown/magicItem';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { MAGIC_ITEMS_PATH } from '../../../routes';
import { MarkdownEntityCreatePage } from '../components/MarkdownEntityCreatePage';
import { useCreateMagicItem } from '../../../hooks';

export const CreateMagicItemPage = () => {
  const navigate = useNavigate();

  const onSuccess = useCallback(() => {
    navigate(MAGIC_ITEMS_PATH);
  }, [
    navigate
  ]);

  const {
    isError,
    mutate
  } = useCreateMagicItem(onSuccess);

  return(
      <MarkdownEntityCreatePage
        backToLinkPath={MAGIC_ITEMS_PATH}
        backToLinkString="Back to magic items"
        createIsError={isError}
        createIsErrorText="There was an error saving this magic item"
        initialMetaData={MAGIC_ITEM_METADATA}
        saveButtonText="Save magic item"
        template={MAGIC_ITEM_TEMPLATE}
        titleString="Create New Magic Item"
        updateFunction={mutate}
      />
  );
};
