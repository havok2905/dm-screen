import {
  Button,
  Input,
  Modal
} from '@designSystem/components';
import {
  Controller,
  SubmitHandler,
  useForm,
  useFormState
} from "react-hook-form";
import {
  useCallback,
  useEffect
} from 'react';

import { AdventurePlayer } from '@core/types';
import { v4 as uuidv4 } from 'uuid';

import {
  useCreateAdventurePlayer,
  useUpdateAdventurePlayer
} from '../../hooks';

export interface ManagePlayersModal {
  adventureId: string;
  isOpen: boolean;
  mutateType: 'create' | 'update';
  onClose: () => void;
  player?: AdventurePlayer;
  refetch: () => void;
}

export const ManagePlayersModal = ({
  adventureId,
  isOpen,
  mutateType,
  onClose,
  player,
  refetch
}: ManagePlayersModal) => {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    trigger
  } = useForm({
    defaultValues: {
      playerName: "",
      characterName: "",
      characterAc: 0
    }, 
  });

  useEffect(() => {
    if (mutateType === 'update' && player) {
      const {
        ac,
        charactername,
        playername
      } = player;
  
      setValue('characterAc', ac);
      setValue('characterName', charactername);
      setValue('playerName', playername);
      trigger();
    }
  }, [
    mutateType,
    player,
    setValue,
    trigger
  ]);

  const onSuccess = useCallback(() => {
    refetch();
    reset();
    onClose();
  }, [
    onClose,
    refetch,
    reset
  ]);

  const {
    mutate: createAdventureCreature
  } = useCreateAdventurePlayer(onSuccess);

  const {
    mutate: updateAdventurePlayer
  } = useUpdateAdventurePlayer(onSuccess);
  
  const newPlayersModalCancel = () => {
    reset();
    onClose();
  };

  type PlayerModalInputs = {
    playerName: string
    characterName: string
    characterAc: number
  }

  const newPlayersModalSubmit: SubmitHandler<PlayerModalInputs> = (data) => {
    if (mutateType === 'create') {
      if (data.playerName && data.characterName) {
        createAdventureCreature({
          ac: data.characterAc,
          adventureid: adventureId,
          charactername: data.characterName,
          id: uuidv4(),
          image: '',
          playername: data.playerName
        })
      }
    }

    if (mutateType === 'update' && player) {
      if (data.playerName && data.characterName) {
        updateAdventurePlayer({
          ac: data.characterAc,
          adventureid: player.adventureid,
          charactername: data.characterName,
          id: player.id,
          image: player.image ?? '',
          playername: data.playerName
        })
      }
    }

    reset();
    onClose();
  }

  const { isValid } = useFormState({control});

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      portalElement={document.body}>
      <form onSubmit={handleSubmit(newPlayersModalSubmit)}>
        <h2>
          {
            mutateType === 'create' ? 'Add Player' : 'Edit Player'
          }
        </h2>
        <fieldset>
          <label htmlFor="playerName">
            Player Name
          </label>
          <Controller 
            control={control}
            name="playerName"
            render={({ field }) => 
              <Input
                {...field}
                full
                inputId="playerName"
                inputName="playerName"
                passedRef={field.ref}
              />
            }
            rules={{
              required: true
            }}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="characterName">
            Character Name
          </label>
          <Controller 
            control={control}
            name="characterName"
            render={({ field }) => 
              <Input
                {...field}
                full
                inputId="characterName"
                inputName="characterName"
                passedRef={field.ref}
              />
            }
            rules={{
              required: true
            }}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="characterAc">
            AC
          </label>
          <Controller 
            control={control}
            name="characterAc"
            render={({ field }) => 
              <Input
                {...field}
                full
                inputId="characterAc"
                inputName="characterAc"
                passedRef={field.ref}
                value={String(field.value)}
              />
            }
            rules={{
              // placeholder AC, 0 - 100
              pattern: /^(0|[1-9][0-9]?|100)$/
            }}
          />
        </fieldset>
        <fieldset>
          <Button
            buttonText={mutateType === 'create' ? 'Add Player' : 'Save Player'}
            disabled={!isValid}
            onClick={handleSubmit(newPlayersModalSubmit)}
          />
          <Button
            buttonText="Cancel"
            onClick={() => {
              newPlayersModalCancel();
            }}
          />
        </fieldset>
      </form>
    </Modal>
  );
};
