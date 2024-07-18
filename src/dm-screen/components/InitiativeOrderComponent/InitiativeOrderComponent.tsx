import { Button } from '@designSystem/components';

import {
  InitiativeItem,
  InitiativeOrderState,
  MarkdownEntity
} from '@core/types';
import {
  useContext,
  useState
} from 'react';

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
  initiativeOrderState: InitiativeOrderState | null;
  playerView?: boolean;
}

export const InitiativeOrderComponent = ({
  creatures,
  handleBootstrapInitiativeOrder,
  handleDestroyInitiativeOrder,
  handleUpdateInitiativeOrder,
  initiativeOrderState,
  playerView
}: InitiativeOrderComponentProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);

  const { getInitiativeOrder } = useContext(InitiativeOrderContext);

  const handleBootstrapInitiativeClick = () => {
    if (handleBootstrapInitiativeOrder) {
      handleBootstrapInitiativeOrder();
    }
  };

  const handleRemoveInitiativeClick = () => {
    if (handleDestroyInitiativeOrder) {
      handleDestroyInitiativeOrder();
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
    }
  };

  const onResourceAChange = (item: InitiativeItem, value: number) => {
    const initiativeOrder = getInitiativeOrder();
    if (initiativeOrder) {
      initiativeOrder.setResourceA(item.id, value);
      handleUpdateInitiativeOrderInternal();
    }
  };

  const onResourceBChange = (item: InitiativeItem, value: number) => {
    const initiativeOrder = getInitiativeOrder();
    if (initiativeOrder) {
      initiativeOrder.setResourceA(item.id, value);
      handleUpdateInitiativeOrderInternal();
    }
  };

  const onSortValueChange = (item: InitiativeItem, value: number) => {
    const initiativeOrder = getInitiativeOrder();
    if (initiativeOrder) {
      initiativeOrder.setSortValue(item.id, value);
      handleUpdateInitiativeOrderInternal();
    }
  };

  const next = () => {
    const initiativeOrder = getInitiativeOrder();
    if (initiativeOrder) {
      initiativeOrder.next();
      handleUpdateInitiativeOrderInternal();
    }
  };

  const prev = () => {
    const initiativeOrder = getInitiativeOrder();
    if (initiativeOrder) {
      initiativeOrder.prev();
      handleUpdateInitiativeOrderInternal();
    }
  };

  const remove = () => {
    const initiativeOrder = getInitiativeOrder();
    if (initiativeOrder) {
      initiativeOrder.remove(openId ?? '');
      handleUpdateInitiativeOrderInternal();
    }
    handleModalClose();
  };

  const reveal = () => {
    const initiativeOrder = getInitiativeOrder();
    if (initiativeOrder) {
      initiativeOrder.reveal(openId ?? '');
      handleUpdateInitiativeOrderInternal();
    }
  };

  const sort = () => {
    const initiativeOrder = getInitiativeOrder();
    if (initiativeOrder) {
      initiativeOrder.sort();
      handleUpdateInitiativeOrderInternal();
    }
  };

  const toggleGmOnly = () => {
    const initiativeOrder = getInitiativeOrder();
    if (initiativeOrder) {
      initiativeOrder.toggleGmOnly(openId ?? '');
      handleUpdateInitiativeOrderInternal();
    }
  };

  const currentItem = initiativeOrderState?.items?.find((item: InitiativeItem) => item.id === openId) ?? null;

  return (
    <>
      <div className="initiative-order">
        <div className="initiative-order-card-list">
          {
            initiativeOrderState?.items?.map((item: InitiativeItem) => {
              return (
                <InitiativeCard
                  active={item.id === initiativeOrderState?.currentId}
                  gmOnly={item.gmOnly}
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
                  playerView={playerView}
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
              {
                initiativeOrderState ? (
                  <>
                    Round: { initiativeOrderState?.round }
                  </>
                ) : (
                  <>
                    Out of initiative
                  </>
                )
              }
            </p>
          </div>
          {
            !playerView && (
              <InitiativeOrderDmControls
                handleBootstrapInitiativeClick={handleBootstrapInitiativeClick}
                handleRemoveInitiativeClick={handleRemoveInitiativeClick}
                inInCombat={!!initiativeOrderState}
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
        <fieldset>
          <label>
            GM Only
          </label>
          <input
            checked={currentItem?.gmOnly}
            id="gm-only-toggle"
            name="gm-only-toggle"
            onChange={() => {
              toggleGmOnly();
            }}
            type="checkbox"
          />
        </fieldset>
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
