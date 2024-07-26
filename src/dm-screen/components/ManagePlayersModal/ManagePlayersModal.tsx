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

import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { PlayersContext } from '../PlayersContext';

export interface ManagePlayersModal {
  isOpen: boolean;
  onClose: () => void;
}

export const ManagePlayersModal = ({
  isOpen,
  onClose
}: ManagePlayersModal) => {
  const { players, setPlayers } = useContext(PlayersContext);

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
    if (data.playerName && data.characterName) {
      setPlayers([
        ...players,
        {
          ac: data.characterAc,
          id: uuidv4(),
          name: data.playerName,
          characterName: data.characterName
        }
      ]);
      reset();
      onClose();
    }
  }

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      playerName: "",
      characterName: "",
      characterAc: 0
    }, 
  });

  const { isValid } = useFormState({control});

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      portalElement={document.body}>
      <form onSubmit={handleSubmit(newPlayersModalSubmit)}>
        <h2>
          Manage Players
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
            buttonText="Add Player"
            disabled={!isValid}
            onClick={handleSubmit(newPlayersModalSubmit)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSubmit(newPlayersModalSubmit);
              }
            }}/>
          <Button
            buttonText="Cancel"
            onClick={() => {
              newPlayersModalCancel();
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                newPlayersModalCancel();
              }
            }}/>
        </fieldset>
      </form>
    </Modal>
  );
};
