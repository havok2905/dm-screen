import {
  Button,
  Input,
  Modal
} from '@designSystem/components';
import React, {
  forwardRef,
  useContext,
  useState
} from 'react';
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';

import { PlayersContext } from '../PlayersContext';

export interface ManagePlayersModal {
  isOpen: boolean;
  onClose: () => void;
}

interface IFormInput {
  firstName: string
  lastName: string
  iceCreamType: { label: string; value: string }
}

export const ManagePlayersModal = ({
  isOpen,
  onClose
}: ManagePlayersModal) => {
  const [newPlayerName, setNewPlayerName] = useState('');
  const [newCharacterName, setNewCharacterName] = useState('');
  const [newCharacterAc, setNewCharacterAc] = useState(0);

  const { players, setPlayers } = useContext(PlayersContext);

  const newPlayersModalCancel = () => {
    setNewPlayerName('');
    setNewCharacterName('');
    setNewCharacterAc(0);
    onClose();
  };

  const newPlayersModalSubmit = () => {
    if (newPlayerName && newCharacterName) {
      setPlayers([
        ...players,
        {
          ac: newCharacterAc,
          id: uuidv4(),
          name: newPlayerName,
          characterName: newCharacterName
        }
      ]);
      setNewPlayerName('');
      setNewCharacterName('');
      setNewCharacterAc(0);
      onClose();
    }
  }

  const { control, handleSubmit } = useForm({
    defaultValues: {
      playerName: "",
      characterName: "",
      characterAc: 0
    }, 
  });

  // let playerNameRef = React.useRef<HTMLInputElement>(null);
  // let characterNameRef = React.useRef<HTMLInputElement>(null);
  // let characterAcRef = React.useRef<HTMLInputElement>(null);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      portalElement={document.body}>
      <form onSubmit={(e) => {
        e.preventDefault();
        newPlayersModalSubmit();
      }}>
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
            render={({ field }) => 
              <Input
                {...field}
                full
                inputId="playerName"
                inputName="playerName"
                onChange={(e) => {
                  setNewPlayerName(e.target.value);
                }}
                value={newPlayerName}
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
            render={({ field }) => 
              <Input
                {...field}
                full
                inputId="characterName"
                inputName="characterName"
                onChange={(e) => {
                  setNewCharacterName(e.target.value);
                }}
                value={newCharacterName}
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
            render={({ field }) => 
              <Input
                {...field}
                full
                inputId="characterAc"
                inputName="characterAc"
                onChange={(e) => {
                  setNewCharacterAc(Number(e.target.value));
                }}
                value={String(newCharacterAc)}
                passedRef={field.ref}
              />
            }
          />
        </fieldset>
        <fieldset>
          <Button
            buttonText="Add Player"
            disabled={!newCharacterName || !newPlayerName}
            onClick={newPlayersModalSubmit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                newPlayersModalSubmit();
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
