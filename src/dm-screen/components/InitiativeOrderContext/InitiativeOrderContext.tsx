import {
  createContext,
  ReactNode,
  useState
} from 'react';
import { InitiativeItem, InitiativeOrder } from '../../../core/types';

export interface InitiativeOrderContextModel {
  initiativeOrder: InitiativeOrder;
  next: () => void;
  prev: () => void;
  remove: (id: string) => void;
  reset: () => void;
  setCurrentId: (id: string) => void;
  setItems: (items: InitiativeItem[]) => void;
  setResourceA: (id: string, value: number) => void;
  setResourceB: (id: string, value: number) => void;
  setSortValue: (id: string, value: number) => void;
  sort: () => void;
}

const defaultInitiativeOrder: InitiativeOrderContextModel = {
  initiativeOrder: {
    currentId: '',
    items: [],
    round: 1,
  },
  next: () => {},
  prev: () => {},
  remove: () => {},
  reset: () => {},
  setCurrentId: () => {},
  setItems: () => {},
  setResourceA: () => {},
  setResourceB: () => {},
  setSortValue: () => {},
  sort: () => {},
};

export const InitiativeOrderContext = createContext<InitiativeOrderContextModel>(defaultInitiativeOrder);

export interface InitiativeOrderContextProviderProps {
  children: ReactNode;
}

export const InitiativeOrderContextProvider = ({
  children
}: InitiativeOrderContextProviderProps) => {
  const [currentId, setCurrentId] = useState<string>('');
  const [items, setItems] = useState<InitiativeItem[]>([]);
  const [round, setRound] = useState<number>(1);

  const handleNext = () => {
    const currentIndex = items.findIndex((item) => item.id === currentId);

    const nextId = items.length === currentIndex + 1
      ? items[0].id
      : items[currentIndex + 1].id;

    if (currentIndex + 1 === items.length) {
      setRound(round + 1);
    }

    setCurrentId(nextId);
  };

  const handlePrev = () => {
    const currentIndex = items.findIndex((item) => item.id === currentId);

    const nextId = currentIndex === 0
      ? items[items.length - 1].id
      : items[currentIndex - 1].id;

    if (currentIndex === 0 && round > 1) {
      setRound(round - 1);
    }

    setCurrentId(nextId);
  };

  const handleRemove = (id: string) => {
    const filtered = items.filter((item) => item.id !== id);

    const currentIndex = items.findIndex((item) => item.id === currentId);
    const targetIndex = items.findIndex((item) => item.id === id);
    const shiftTotal = items.length - filtered.length;

    console.log({ shiftTotal, currentIndex, targetIndex });

    // progress forward for number of items removed, but this should almost always be 1 since we use GUIDs.
    for(let x=0; x<shiftTotal; x++) {
      handleNext();
    }

    // if we are removing the item directly after the current item, we won't have a target to move to, so we have to progress again
    if (currentIndex === targetIndex - 1) {
      handleNext();
    }

    setItems(filtered);
  };

  const handleReset = () => {
    setCurrentId('');
    setItems([]);
    setRound(1);
  };

  const handleSetCurrentId = (id: string) => {
    setCurrentId(id);
  };

  const handleSetResourceA = (id: string, value: number) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        item.resourceA = value;
      }

      return item;
    });

    setItems(newItems);
  };

  const handleSetResourceB = (id: string, value: number) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        item.resourceB = value;
      }

      return item;
    });

    setItems(newItems);
  };

  const handleSetSortValue = (id: string, value: number) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        item.sortValue = value;
      }

      return item;
    });

    setItems(newItems);
  };

  const handleSetItems = (items: InitiativeItem[]) => {
    setItems(items);
  }

  const handleSort = () => {
    const toBeSorted = [
      ...items
    ];

    toBeSorted.sort((a, b) => {
      if (a.sortValue > b.sortValue) return -1;
      if (a.sortValue < b.sortValue) return 1;
      return 0;
    });

    if (!currentId) {
      setCurrentId(toBeSorted[0].id);
    }

    setItems(toBeSorted);
  };

  const contextModel: InitiativeOrderContextModel = {
    initiativeOrder: {
      currentId,
      items,
      round
    },
    next: handleNext,
    prev: handlePrev,
    remove: handleRemove,
    reset: handleReset,
    setCurrentId: handleSetCurrentId,
    setItems: handleSetItems,
    setResourceA: handleSetResourceA,
    setResourceB: handleSetResourceB,
    setSortValue: handleSetSortValue,
    sort: handleSort
  };

  return (
    <InitiativeOrderContext.Provider value={contextModel}>
      {children}
    </InitiativeOrderContext.Provider>
  );
};
