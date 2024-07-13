import {
  InitiativeItem,
  MarkdownEntity
} from '@core/types';
import {
  useContext,
  useState
} from 'react';

import { Button } from '@designSystem/components';
import { InitiativeOrder } from '@core/InitiativeOrder';

import { InitiativeCard } from '../InitiativeCard';
import { InitiativeItemModal } from '../InitiativeItemModal';
import { InitiativeOrderContext } from '../InitiativeOrderContext';
import { InitiativeOrderDmControls } from './InitiativeOrderDmControls';
import { InitiativeOrderDmNavControls } from './InitiativeOrderDmNavControls';

import './InitiativeOrderComponent.css';

export interface InitiativeOrderComponentProps {
  creatures: MarkdownEntity[];
  handleBootstrapInitiativeOrder?: () => void;
  handleDestroyInitiativeOrder?: () => void;
  handleUpdateInitiativeOrder?: () => void;
  playerView?: boolean;
}

export const InitiativeOrderComponent = ({
  creatures,
  handleBootstrapInitiativeOrder,
  handleDestroyInitiativeOrder,
  handleUpdateInitiativeOrder,
  playerView
}: InitiativeOrderComponentProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);

  const {
    getInitiativeOrder,
    initiativeOrderState,
    setInitiativeOrder,
    setInitiativeOrderState
  } = useContext(InitiativeOrderContext);

  const handleBootstrapInitiativeClick = () => {
    if (handleBootstrapInitiativeOrder) {
      handleBootstrapInitiativeOrder();
      const initiativeOrder = new InitiativeOrder();
      setInitiativeOrder(initiativeOrder);
      setInitiativeOrderState(initiativeOrder.getState());
    }
  };

  const handleRemoveInitiativeClick = () => {
    if (handleDestroyInitiativeOrder) {
      handleDestroyInitiativeOrder();
      setInitiativeOrder(null);
      setInitiativeOrderState(null);
    }
  };

  const handleUpdateInitiativeOrderInternal = () => {
    if (handleUpdateInitiativeOrder) {
      handleUpdateInitiativeOrder();
    }
  }

  const handleModalClose = () => {
    setIsOpen(false);
    setOpenId(null);
  };

  const hide = () => {
    const initiativeOrder = getInitiativeOrder();
    if (initiativeOrder) {
      initiativeOrder.hide(openId ?? '');
      handleUpdateInitiativeOrderInternal();
      setInitiativeOrderState(initiativeOrder.getState());
    }
  };

  const onResourceAChange = (item: InitiativeItem, value: number) => {
    const initiativeOrder = getInitiativeOrder();
    if (initiativeOrder) {
      initiativeOrder.setResourceA(item.id, value);
      handleUpdateInitiativeOrderInternal();
      setInitiativeOrderState(initiativeOrder.getState());
    }
  };

  const onResourceBChange = (item: InitiativeItem, value: number) => {
    const initiativeOrder = getInitiativeOrder();
    if (initiativeOrder) {
      initiativeOrder.setResourceA(item.id, value);
      handleUpdateInitiativeOrderInternal();
      setInitiativeOrderState(initiativeOrder.getState());
    }
  };

  const onSortValueChange = (item: InitiativeItem, value: number) => {
    const initiativeOrder = getInitiativeOrder();
    if (initiativeOrder) {
      initiativeOrder.setSortValue(item.id, value);
      handleUpdateInitiativeOrderInternal();
      setInitiativeOrderState(initiativeOrder.getState());
    }
  };

  const next = () => {
    const initiativeOrder = getInitiativeOrder();
    if (initiativeOrder) {
      initiativeOrder.next();
      handleUpdateInitiativeOrderInternal();
      setInitiativeOrderState(initiativeOrder.getState());
    }
  };

  const prev = () => {
    const initiativeOrder = getInitiativeOrder();
    if (initiativeOrder) {
      initiativeOrder.prev();
      handleUpdateInitiativeOrderInternal();
      setInitiativeOrderState(initiativeOrder.getState());
    }
  };

  const remove = () => {
    const initiativeOrder = getInitiativeOrder();
    if (initiativeOrder) {
      initiativeOrder.remove(openId ?? '');
      handleUpdateInitiativeOrderInternal();
      setInitiativeOrderState(initiativeOrder.getState());
    }
    handleModalClose();
  };

  const reveal = () => {
    const initiativeOrder = getInitiativeOrder();
    if (initiativeOrder) {
      initiativeOrder.reveal(openId ?? '');
      handleUpdateInitiativeOrderInternal();
      setInitiativeOrderState(initiativeOrder.getState());
    }
  };

  const sort = () => {
    const initiativeOrder = getInitiativeOrder();
    if (initiativeOrder) {
      initiativeOrder.sort();
      handleUpdateInitiativeOrderInternal();
      setInitiativeOrderState(initiativeOrder.getState());
    }
  };

  const currentItem = initiativeOrderState?.items?.find((item) => item.id === openId) ?? null;

  return (
    <>
      <div className="initiative-order">
        <div className="initiative-order-card-list">
          {
            initiativeOrderState?.items?.map((item) => {
              return (
                <InitiativeCard
                  active={item.id === initiativeOrderState?.currentId}
                  imageSrc={item.imageSrc}
                  key={item.id}
                  name={item.name}
                  onDoubleClick={() => {
                    setIsOpen(true);
                    setOpenId(item.id);
                  }}
                  onResourceAChange={(value) => {
                    onResourceAChange(item, value);
                  }}
                  onResourceBChange={(value) => {
                    onResourceBChange(item, value);
                  }}
                  onSortValueChange={(value) => {
                    onSortValueChange(item, value);
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
          {
            !playerView && (
              <InitiativeOrderDmNavControls
                isDisabled={!initiativeOrderState?.items?.length}
                isPlayer={!!playerView}
                next={next}
                prev={prev}
                sort={sort}
              />
            )
          }
          <div>
            <p>
              Round: {initiativeOrderState?.round ?? 0}
            </p>
          </div>
          {
            !playerView && (
              <InitiativeOrderDmControls
                handleBootstrapInitiativeClick={handleBootstrapInitiativeClick}
                handleRemoveInitiativeClick={handleRemoveInitiativeClick}
                isPlayer={!!playerView}
              />
            )
          }
        </div>
      </div>
      <InitiativeItemModal
        creatures={creatures}
        isOpen={isOpen}
        item={currentItem}
        onClose={handleModalClose}>
        <Button
          buttonText="Remove from initiative"
          onClick={() => {
            remove();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              remove();
            }
          }}
        />
        <Button
          buttonText="Hide"
          disabled={currentItem?.visibilityState !== 'on'}
          onClick={() => {
            hide();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              hide();
            }
          }}
        />
        <Button
          buttonText="Reveal"
          disabled={currentItem?.visibilityState !== 'hidden'}
          onClick={() => {
            reveal();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              reveal();
            }
          }}
        />
      </InitiativeItemModal>
    </>
  )
};
