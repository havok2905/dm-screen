import { CREATURE_METADATA } from '@templates/metadata/creature';
import { CREATURE_TEMPLATE } from '@templates/markdown/creature';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { MarkdownEntityCreatePage } from '../components/MarkdownEntityCreatePage';
import { useCreateCreature } from '../../../hooks';

import {
  CREATURES_PATH,
  EDIT_CREATURE_PATH
} from '../../../routes';

export const CreateCreaturePage = () => {
  const navigate = useNavigate();

  const onSuccess = useCallback((id: string) => {
    navigate(EDIT_CREATURE_PATH.replace(':id', id));
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
