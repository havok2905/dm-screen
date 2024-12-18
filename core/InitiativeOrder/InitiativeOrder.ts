import {
  InitiativeItem,
  InitiativeOrderState,
  VisibilityState
} from '@core/types';

export interface InitiativeOrderInterface {
  getCurrentId(): string;
  getItems(): InitiativeItem[];
  getRound(): number;
  hide(id: string): void;
  next(): void;
  prev(): void;
  remove(id: string): void;
  reset(): void;
  reveal(id: string): void;
  setConditions(id: string, conditions: string);
  setCurrentId(id: string): void;
  setItems(items: InitiativeItem[]): void;
  setLabel(id: string, value: string): void;
  setResourceA(id: string, value: number): void;
  setResourceB(id: string, value: number): void;
  setSortValue(id: string, value: number): void;
  getState(): InitiativeOrderState;
  setRound(round: number): void;
  sort: () => void;
  toggleGmOnly: (id: string) => void;
}

export class InitiativeOrder implements InitiativeOrderInterface {
  private currentId: string;
  private items: InitiativeItem[];
  private round: number;
  
  constructor() {
    this.currentId  =  '';
    this.items = [];
    this.round = 1;
  }

  getCurrentId(): string {
    return this.currentId;
  }

  getItems(): InitiativeItem[] {
    return this.items;
  }

  getRound(): number {
    return this.round;
  }

  getState(): InitiativeOrderState {
    return {
      currentId: this.currentId,
      items: this.items,
      round: this.round
    };
  }

  hide(id: string) {
    const newItems = this.items.map((item) => {
      if (item.id === id) {
        item.visibilityState = VisibilityState.HIDDEN;
      }

      return item;
    });

    this.items = newItems;
  }

  next() {
    const currentItemIndex = this.items.findIndex((item) => item.id === this.currentId); 
    let nextItem: InitiativeItem | null = null;

    let x = currentItemIndex;
    while(!nextItem) {
      const nextIndex = x === this.items.length - 1
        ? 0
        : x+1;
      
      const n = this.items[nextIndex];

      if (n.visibilityState != VisibilityState.REMOVED && !n.gmOnly) {
        nextItem = n;
      }

      x = nextIndex;
    }

    if (currentItemIndex + 1 === this.items.length) {
      this.round = this.round + 1;
    }

    this.currentId = nextItem?.id ?? '';
  }

  prev() {
    const currentItemIndex = this.items.findIndex((item) => item.id === this.currentId); 
    let prevItem: InitiativeItem | null = null;

    let x = currentItemIndex;
    while(!prevItem) {
      const prevIndex = x === 0
        ? this.items.length - 1
        : x-1;
      
      const n = this.items[prevIndex];

      if (n.visibilityState != VisibilityState.REMOVED && !n.gmOnly) {
        prevItem = n;
      }

      x = prevIndex;
    }

    if (currentItemIndex === 0 && this.round > 1) {
      this.round = this.round - 1;
    }

    this.currentId = prevItem?.id ?? '';
  }

  remove = (id: string) => {
    const filtered = this.items.map((item) => {
      if (item.id === id) {
        const initiativeItem: InitiativeItem = {
          ...item,
          visibilityState: VisibilityState.REMOVED
        };

        return initiativeItem
      }

      return item;
    });

    this.items = filtered;

    if (this.currentId === id) {
      this.next();
    }
  };

  reset() {
    this.currentId = '';
    this.items = [];
    this.round = 1;
  }

  reveal = (id: string) => {
    const newItems = this.items.map((item) => {
      if (item.id === id) {
        item.visibilityState = VisibilityState.ON;
      }

      return item;
    });

    this.items = newItems;
  };

  setConditions(id: string, conditions: string) {
    const newItems = this.items.map((item) => {
      if (item.id === id) {
        item.conditions = conditions;
      }

      return item;
    });

    this.items = newItems;
  }

  setCurrentId(id: string) {
    this.currentId = id;
  }

  setItems(items: InitiativeItem[]) {
    this.items = items;
  }

  setLabel(id: string, value: string) {
    const newItems = this.items.map((item) => {
      if (item.id === id) {
        item.label = value;
      }

      return item;
    });

    this.items = newItems;
  }

  setResourceA(id: string, value: number) {
    const newItems = this.items.map((item) => {
      if (item.id === id) {
        item.resourceA = value;
      }

      return item;
    });

    this.items = newItems;
  }

  setResourceB(id: string, value: number) {
    const newItems = this.items.map((item) => {
      if (item.id === id) {
        item.resourceB = value;
      }

      return item;
    });

    this.items = newItems;
  }

  setRound(round: number) {
    this.round = round;
  }

  setSortValue(id: string, value: number) {
    const newItems = this.items.map((item) => {
      if (item.id === id) {
        item.sortValue = value;
      }

      return item;
    });

    this.items = newItems;
  }

  sort() {
    const toBeSorted = [
      ...this.items
    ];

    toBeSorted.sort((a, b) => {
      if (a.sortValue > b.sortValue) return -1;
      if (a.sortValue < b.sortValue) return 1;
      return 0;
    });

    if (!this.currentId) {
      this.currentId = toBeSorted[0].id;
    }

    this.items = toBeSorted;
  }

  toggleGmOnly(id: string) {
    const newItems = this.items.map((item) => {
      if (item.id === id) {
        item.gmOnly = !item.gmOnly;
      }

      return item;
    });

    this.items = newItems;
  }
}