import {
  EntityType,
  InitiativeItem,
  MarkdownEntity,
  Player
} from '@core/types';

import { Modal } from '@designSystem/components';
import { ReactNode } from 'react';

import { Markdown } from '../Markdown';

import './InitiativeItemModal.css';

export interface InitiativeItemModalProps {
  children: ReactNode;
  creatures: MarkdownEntity[];
  onClose: () => void;
  players: Player[];
  isOpen: boolean;
  item: InitiativeItem | null;
}

export const InitiativeItemModal = ({
  children,
  creatures,
  onClose,
  players,
  isOpen,
  item
}: InitiativeItemModalProps) => {
  const getContentForModal = () => {
    if (!item || !isOpen)  return null;

    if (item.entityType === EntityType.CREATURE) {
      const currentEntity = creatures.find((i) => i.id === item.entityId);

      if (!currentEntity) return null;

      return (
        <>
          {
            !!currentEntity?.image && (
              <img
                alt={currentEntity.name}
                src={currentEntity.image}
                style={{
                  maxWidth: "100%"
                }}/>
            )
          }
          <Markdown content={currentEntity.content ?? ''}/>
        </>
      )
    } else if (item.entityType === EntityType.PLAYER) {
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
