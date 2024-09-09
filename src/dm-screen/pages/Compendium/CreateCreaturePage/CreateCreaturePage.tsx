import { CREATURE_METADATA } from '@templates/metadata/creature';
import { CREATURE_TEMPLATE } from '@templates/markdown/creature';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { CREATURES_PATH } from '../../../routes';
import { MarkdownEntityCreatePage } from '../components/MarkdownEntityCreatePage';
import { useCreateCreature } from '../../../hooks';

export const CreateCreaturePage = () => {
  const navigate = useNavigate();

  const onSuccess = useCallback(() => {
    navigate(CREATURES_PATH);
  }, [
    navigate
  ]);

  const {
    isError,
    mutate
  } = useCreateCreature(onSuccess);

  return(
      <MarkdownEntityCreatePage
        backToLinkPath={CREATURES_PATH}
        backToLinkString="Back to creatures"
        createIsError={isError}
        createIsErrorText="There was an error saving this creature"
        initialMetaData={CREATURE_METADATA}
        saveButtonText="Save creature"
        template={CREATURE_TEMPLATE}
        titleString="Create New Creature"
        updateFunction={mutate}
      />
  );
};
