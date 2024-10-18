import { Button, MultiSelect } from '@designSystem/components';

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
import {StatusEffects} from '@rules/enums';

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
      initiativeOrder.setResourceB(item.id, value);
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

  const handleOnConditionChange = (conditions: string) => {
    const initiativeOrder = getInitiativeOrder();
    if (initiativeOrder) {
      initiativeOrder.setConditions(openId ?? '', conditions);
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
                  statuses={item.conditions ? item.conditions?.split('|') as StatusEffects[] : []}
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
                <span data-test-id="initiative-order-state-round">
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
                </span>
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
        <fieldset>
          <Button
            buttonText="Remove from initiative"
            onClick={() => {
              remove();
            }}
          />
          <Button
            buttonText="Hide"
            disabled={currentItem?.visibilityState !== 'on'}
            onClick={() => {
              hide();
            }}
          />
          <Button
            buttonText="Reveal"
            disabled={currentItem?.visibilityState !== 'hidden'}
            onClick={() => {
              reveal();
            }}
          />
        </fieldset>
        <fieldset>
          <MultiSelect
            dataItems={[
              {
                displayValue: 'Blinded',
                value: StatusEffects.BLINDED
              },
              {
                displayValue: 'Charmed',
                value: StatusEffects.CHARMED
              },
              {
                displayValue: 'Dead',
                value: StatusEffects.DEAD
              },
              {
                displayValue: 'Deafened',
                value: StatusEffects.DEAFENED
              },
              {
                displayValue: 'Exhaustion',
                value: StatusEffects.EXHAUSTION
              },
              {
                displayValue: 'Frightened',
                value: StatusEffects.FRIGHTENED
              },
              {
                displayValue: 'Grappled',
                value: StatusEffects.GRAPPLED
              },
              {
                displayValue: 'Incapacitated',
                value: StatusEffects.INCAPACITATED
              },
              {
                displayValue: 'Invisible',
                value: StatusEffects.INVISIBLE
              },
              {
                displayValue: 'Paralyzed',
                value: StatusEffects.PARALYZED
              },
              {
                displayValue: 'Petriifed',
                value: StatusEffects.PETRIFIED
              },
              {
                displayValue: 'Poisoned',
                value: StatusEffects.POISONED
              },
              {
                displayValue: 'Prone',
                value: StatusEffects.PRONE
              },
              {
                displayValue: 'Restrained',
                value: StatusEffects.RESTRAINED
              },
              {
                displayValue: 'Stunned',
                value: StatusEffects.STUNNED
              },
              {
                displayValue: 'Unconscious',
                value: StatusEffects.UNCONSCIOUS
              }
            ]}
            initialSelected={(currentItem?.conditions ? currentItem?.conditions.split('|') : [])}
            inputId="condition-dropdown"
            maxHeight={150}
            onSelect={(conditions) => {
              handleOnConditionChange(conditions);
            }}
            width="400px"
          />
        </fieldset>
      </InitiativeItemModal>
    </>
  )
};
