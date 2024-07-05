import { ReactNode, useContext } from 'react';
import { Modal } from '@designSystem/components';
import { AdventureContext } from '../AdventureContext';
import { InitiativeItem } from '../../../core/types';
import { Markdown } from '../Markdown';
import { PlayersContext } from '../PlayersContext';
import './InitiativeItemModal.css';

export interface InitiativeItemModalProps {
  children: ReactNode;
  onClose: () => void;
  isOpen: boolean;
  item: InitiativeItem | null;
}

export const InitiativeItemModal = ({
  children,
  onClose,
  isOpen,
  item
}: InitiativeItemModalProps) => {
  const {
    creatures
  } = useContext(AdventureContext);

  const {
    players
  } = useContext(PlayersContext);

  const getContentForModal = () => {
    if (!item || !isOpen)  return null;

    if (item.entityType === 'creature') {
      const currentEntity = creatures.find((i) => i.id === item.entityId);

      if (!currentEntity) return null;

      return (
        <>
          {
            !!currentEntity?.image && (
              <img
                alt={currentEntity.name}
                src={currentEntity.image}
                width="100%"/>
            )
          }
          <Markdown content={currentEntity.content ?? ''}/>
        </>
      )
    } else if (item.entityType === 'player') {
      const currentEntity = players.find((i) => i.id === item.entityId);

      if (!currentEntity) return null;

      return (
        <table>
          <thead>
            <tr>
              <th scope="col">
                Player
              </th>
              <th scope="col">
                Character
              </th>
              <th scope="col">
                AC
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{currentEntity?.name}</td>
              <td>{currentEntity?.characterName}</td>
              <td>{currentEntity?.ac}</td>
            </tr>
          </tbody>
        </table>
      )
    } else {
      return null;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      portalElement={document.body}>
      <div className="initiative-item-modal-actions">
        {children}
      </div>
      {getContentForModal()}
    </Modal>
  );
};
