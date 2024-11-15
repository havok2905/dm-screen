import { MarkdownEntity } from '@core/types';
import { useParams } from 'react-router-dom';

import { MarkdownEntityViewPage } from '../components/MarkdownEntityViewPage';
import { SPELLS_PATH } from '../../../routes';
import { useSpell } from '../../../hooks';

export const SpellPage = () => {
  const { id: spellId } = useParams();

  const {
    data,
    isFetching,
    isLoading,
    isPending
  } = useSpell(spellId ?? '');

  const isPageLoading =
    isFetching ||
    isLoading ||
    isPending;

  const spellData = data as MarkdownEntity;

  return (
    <MarkdownEntityViewPage
      backLinkLabel="Back to spells"
      backLinkPath={SPELLS_PATH}
      isLoading={isPageLoading}
      markdownEntity={spellData}
    />
  );
};
