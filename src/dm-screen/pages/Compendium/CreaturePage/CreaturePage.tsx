import { MarkdownEntity } from '@core/types';
import { useParams } from 'react-router-dom';

import { CREATURES_PATH } from '../../../routes';
import { MarkdownEntityViewPage } from '../components/MarkdownEntityViewPage';
import { useCreature } from '../../../hooks';

export const CreaturePage = () => {
  const { id: creatureId } = useParams();

  const {
    data,
    isFetching,
    isLoading,
    isPending
  } = useCreature(creatureId ?? '');

  const isPageLoading =
    isFetching ||
    isLoading ||
    isPending;

  const creatureData = data as MarkdownEntity;

  return (
    <MarkdownEntityViewPage
      backLinkLabel="Back to creatures"
      backLinkPath={CREATURES_PATH}
      isLoading={isPageLoading}
      markdownEntity={creatureData}
    />
  );
};
