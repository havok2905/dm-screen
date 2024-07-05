import { useContext, useState } from 'react';
import {
  Button,
  LinkButton
} from '@designSystem/components';
import { InitiativeCard } from '../InitiativeCard';
import { InitiativeItemModal } from '../InitiativeItemModal';
import { InitiativeOrderContext } from '../InitiativeOrderContext';
import './InitiativeOrder.css';

export const InitiativeOrder = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);

  const {
    hide,
    initiativeOrder: {
      currentId,
      items,
      round
    },
    next,
    prev,
    remove,
    reset,
    reveal,
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

  const currentItem = items.find((item) => item.id === openId) ?? null;

  return (
    <>
      <div className="initiative-order">
        <div className="initiative-order-card-list">
          {
            items.map((item) => {
              return (
                <InitiativeCard
                  active={item.id === currentId}
                  imageSrc={item.imageSrc}
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
                  visibilityState={item.visibilityState}
                />
              );
            })
          }
        </div>
        <div className="initiative-order-card-button-container">
          <div>
            <Button
              buttonText="Prev"
              disabled={items.length === 0}
              onClick={prev}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  prev();
                }
              }}/>
            <Button
              buttonText="Next"
              disabled={items.length === 0}
              onClick={next}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  next();
                }
              }}/>
            <Button
              buttonText="Sort"
              disabled={items.length === 0}
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
      <InitiativeItemModal
        isOpen={isOpen}
        item={currentItem}
        onClose={handleModalClose}>
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
        <Button
          buttonText="Hide"
          disabled={currentItem?.visibilityState !== 'on'}
          onClick={() => {
            hide(openId ?? '');
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              hide(openId ?? '');
            }
          }}
        />
        <Button
          buttonText="Reveal"
          disabled={currentItem?.visibilityState !== 'hidden'}
          onClick={() => {
            reveal(openId ?? '');
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              reveal(openId ?? '');
            }
          }}
        />
      </InitiativeItemModal>
    </>
  )
};
