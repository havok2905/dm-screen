import {
  Button,
  Input,
  Modal
} from '@designSystem/components';
import { useContext } from 'react';
import { useForm, useFormState, Controller, SubmitHandler } from "react-hook-form";
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
            name="playerName"
            control={control}
            rules={{
              required: true
            }}
            render={({ field }) => 
              <Input
                {...field}
                full
                inputId="playerName"
                inputName="playerName"
                passedRef={field.ref}
              />
            }
          />
        </fieldset>
        <fieldset>
          <label htmlFor="characterName">
            Character Name
          </label>
          <Controller 
            name="characterName"
            control={control}
            rules={{
              required: true
            }}
            render={({ field }) => 
              <Input
                {...field}
                full
                inputId="characterName"
                inputName="characterName"
                passedRef={field.ref}
              />
            }
          />
        </fieldset>
        <fieldset>
          <label htmlFor="characterAc">
            AC
          </label>
          <Controller 
            name="characterAc"
            control={control}
            rules={{
              // placeholder AC, 0 - 100
              pattern: /^(0|[1-9][0-9]?|100)$/
            }}
            render={({ field }) => 
              <Input
                {...field}
                full
                inputId="characterAc"
                inputName="characterAc"
                value={String(field.value)}
                passedRef={field.ref}
              />
            }
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
