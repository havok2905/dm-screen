import { useContext, useState } from 'react';
import {
  Button,
  LinkButton,
  Modal
} from '@designSystem/components';
import { AdventureContext } from '../AdventureContext';
import { InitiativeCard } from '../InitiativeCard';
import { InitiativeOrderContext } from '../InitiativeOrderContext';
import { Markdown } from '../Markdown';
import { PlayersContext } from '../PlayersContext';
import './InitiativeOrder.css';

export const InitiativeOrder = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);

  const {
    creatures
  } = useContext(AdventureContext);

  const {
    players
  } = useContext(PlayersContext);

  const {
    initiativeOrder: {
      currentId,
      items,
      round
    },
    next,
    prev,
    remove,
    reset,
    setResourceA,
    setResourceB,
    setSortValue,
    sort
  } = useContext(InitiativeOrderContext);

  const handleStartNewCombatClick = () => {
    reset();
  };


  const handleModalClose = () => {
    setIsOpen(false);
    setOpenId(null);
  };

  const getContentForModal = () => {
    if (!openId || !isOpen)  return null;

    const currentItem = items.find((item) => item.id === openId);

    if (currentItem?.entityType === 'creature') {
      const currentEntity = creatures.find((item) => item.id === currentItem.entityId);

      return (
        <Markdown content={currentEntity?.content ?? ''}/>
      )
    } else if (currentItem?.entityType === 'player') {
      const currentEntity = players.find((item) => item.id === currentItem.entityId);

      return (
        <p>{JSON.stringify(currentEntity)}</p>
      )
    } else {
      return null;
    }
  };

  return (
    <>
      <div className="initiative-order">
        <div className="initiative-order-card-list">
          {
            items.map((item) => {
              return (
                <InitiativeCard
                  active={item.id === currentId}
                  key={item.id}
                  name={item.name}
                  onDoubleClick={() => {
                    setIsOpen(true);
                    setOpenId(item.id);
                  }}
                  onResourceAChange={(value) => {
                    setResourceA(item.id, value);
                  }}
                  onResourceBChange={(value) => {
                    setResourceB(item.id, value);
                  }}
                  onSortValueChange={(value) => {
                    setSortValue(item.id, value);
                  }}
                  resourceA={item.resourceA}
                  resourceB={item.resourceB}
                  sortValue={item.sortValue}
                />
              );
            })
          }
        </div>
        <div className="initiative-order-card-button-container">
          <div>
            <Button
              buttonText="Prev"
              onClick={prev}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  prev();
                }
              }}/>
            <Button
              buttonText="Next"
              onClick={next}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  next();
                }
              }}/>
            <Button
              buttonText="Sort"
              onClick={sort}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  sort();
                }
              }}/>
          </div>
          <div>
            <p>
              Round: {round}
            </p>
          </div>
          <div>
            <LinkButton
              buttonText="Reset Combat"
              color="red"
              onClick={handleStartNewCombatClick}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleStartNewCombatClick();
                }
              }}/>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={handleModalClose}
        portalElement={document.body}>
        <Button
          buttonText="Remove from initiative"
          onClick={() => {
            remove(openId ?? '');
            handleModalClose();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              remove(openId ?? '');
              handleModalClose();
            }
          }}
        />
        {getContentForModal()}
      </Modal>
    </>
  )
};
