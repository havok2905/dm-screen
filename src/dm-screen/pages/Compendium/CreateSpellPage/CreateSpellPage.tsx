import { SPELL_METADATA } from '@templates/metadata/spell';
import { SPELL_TEMPLATE } from '@templates/markdown/spell';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { MarkdownEntityCreatePage } from '../components/MarkdownEntityCreatePage';
import { SPELLS_PATH } from '../../../routes';
import { useCreateSpell } from '../../../hooks';

export const CreateSpellPage = () => {
  const navigate = useNavigate();

  const onSuccess = useCallback(() => {
    navigate(SPELLS_PATH);
  }, [
    navigate
  ]);

  const {
    isError,
    mutate
  } = useCreateSpell(onSuccess);

  return(
      <MarkdownEntityCreatePage
        backToLinkPath={SPELLS_PATH}
        backToLinkString="Back to spells"
        createIsError={isError}
        createIsErrorText="There was an error saving this spell"
        initialMetaData={SPELL_METADATA}
        saveButtonText="Save spell"
        template={SPELL_TEMPLATE}
        titleString="Create New Spell"
        updateFunction={mutate}
      />
  );
};
