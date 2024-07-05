import {
  createContext,
  ReactNode,
  useState
} from 'react';
import { InitiativeItem, InitiativeOrder } from '../../../core/types';

export interface InitiativeOrderContextModel {
  hide: (id: string) => void;
  initiativeOrder: InitiativeOrder;
  next: () => void;
  prev: () => void;
  remove: (id: string) => void;
  reset: () => void;
  reveal: (id: string) => void;
  setCurrentId: (id: string) => void;
  setItems: (items: InitiativeItem[]) => void;
  setResourceA: (id: string, value: number) => void;
  setResourceB: (id: string, value: number) => void;
  setSortValue: (id: string, value: number) => void;
  sort: () => void;
}

const defaultInitiativeOrder: InitiativeOrderContextModel = {
  hide: () => {},
  initiativeOrder: {
    currentId: '',
    items: [],
    round: 1,
  },
  next: () => {},
  prev: () => {},
  remove: () => {},
  reset: () => {},
  reveal: () => {},
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

  const handleHide = (id: string) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        item.visibilityState = 'hidden';
      }

      return item;
    });

    setItems(newItems);
  };

  const handleNext = () => {
    const currentItemIndex = items.findIndex((item) => item.id === currentId); 
    let nextItem: InitiativeItem | null = null;

    let x = currentItemIndex;
    while(!nextItem) {
      const nextIndex = x === items.length - 1
        ? 0
        : x+1;
      
      const n = items[nextIndex];

      if (
        n.visibilityState === 'on' ||
        n.visibilityState === 'hidden'
      ) {
        nextItem = n;
      }

      x = nextIndex;
    }

    if (currentItemIndex + 1 === items.length) {
      setRound(round + 1);
    }

    setCurrentId(nextItem?.id ?? '');
  };

  const handlePrev = () => {
    const currentItemIndex = items.findIndex((item) => item.id === currentId); 
    let prevItem: InitiativeItem | null = null;

    let x = currentItemIndex;
    while(!prevItem) {
      const prevIndex = x === 0
        ? items.length - 1
        : x-1;
      
      const n = items[prevIndex];

      if (
        n.visibilityState === 'on' ||
        n.visibilityState === 'hidden'
      ) {
        prevItem = n;
      }

      x = prevIndex;
    }

    if (currentItemIndex === 0 && round > 1) {
      setRound(round -1);
    }

    setCurrentId(prevItem?.id ?? '');
  };

  const handleRemove = (id: string) => {
    const filtered = items.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          visibilityState: 'removed'
        }
      }

      return item;
    });

    setItems(filtered);

    if (currentId === id) {
      handleNext();
    }
  };

  const handleReset = () => {
    setCurrentId('');
    setItems([]);
    setRound(1);
  };

  const handleReveal = (id: string) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        item.visibilityState = 'on';
      }

      return item;
    });

    setItems(newItems);
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
    if (items.length === 1) {
      setCurrentId(items[0].id);
    }
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
    hide: handleHide,
    initiativeOrder: {
      currentId,
      items,
      round
    },
    next: handleNext,
    prev: handlePrev,
    remove: handleRemove,
    reset: handleReset,
    reveal: handleReveal,
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
