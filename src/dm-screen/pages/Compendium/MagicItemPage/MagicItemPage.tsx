import { MarkdownEntity } from '@core/types';
import { useParams } from 'react-router-dom';

import { MAGIC_ITEMS_PATH } from '../../../routes';
import { MarkdownEntityViewPage } from '../components/MarkdownEntityViewPage';
import { useMagicItem } from '../../../hooks';

export const MagicItemPage = () => {
  const { id: itemId } = useParams();

  const {
    data,
    isFetching,
    isLoading,
    isPending
  } = useMagicItem(itemId ?? '');

  const isPageLoading =
    isFetching ||
    isLoading ||
    isPending;

  const itemData = data as MarkdownEntity;

  return (
    <MarkdownEntityViewPage
      backLinkLabel="Back to magic items"
      backLinkPath={MAGIC_ITEMS_PATH}
      isLoading={isPageLoading}
      markdownEntity={itemData}
    />
  );
};
