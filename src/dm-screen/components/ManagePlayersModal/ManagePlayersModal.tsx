import {
  useContext,
  useState
} from 'react';
import {
  Button,
  Input,
  Modal
} from '@designSystem/components';
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
          <label htmlFor="player-name">
            Player Name
          </label>
          <Input
            full
            inputId="player-name"
            inputName="player-name"
            onChange={(e) => {
              setNewPlayerName(e.target.value);
            }}
            value={newPlayerName}/>
        </fieldset>
        <fieldset>
          <label htmlFor="character-name">
            Character Name
          </label>
          <Input
            full
            inputId="character-name"
            inputName="character-name"
            onChange={(e) => {
              setNewCharacterName(e.target.value);
            }}
            value={newCharacterName}/>
        </fieldset>
        <fieldset>
          <label htmlFor="character-ac">
            AC
          </label>
          <Input
            full
            inputId="character-ac"
            inputName="character-ac"
            onChange={(e) => {
              setNewCharacterAc(Number(e.target.value));
            }}
            value={String(newCharacterAc)}/>
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
