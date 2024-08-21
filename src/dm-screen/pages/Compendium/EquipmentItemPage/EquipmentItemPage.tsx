import { MarkdownEntity } from '@core/types';
import { useParams } from 'react-router-dom';

import { EQUIPMENT_ITEMS_PATH } from '../../../routes';
import { MarkdownEntityViewPage } from '../components/MarkdownEntityViewPage';
import { useEquipmentItem } from '../../../hooks';

export const EquipmentItemPage = () => {
  const { id: itemId } = useParams();

  const {
    data,
    isFetching,
    isLoading,
    isPending
  } = useEquipmentItem(itemId ?? '');

  const isPageLoading =
    isFetching ||
    isLoading ||
    isPending;

  const itemData = data as MarkdownEntity;

  return (
    <MarkdownEntityViewPage
      backLinkLabel="Back to equipment items"
      backLinkPath={EQUIPMENT_ITEMS_PATH}
      isLoading={isPageLoading}
      markdownEntity={itemData}
    />
  );
};
