import {
  EntityType,
  InitiativeItem,
  VisibilityState
} from '@core/types';

import { InitiativeOrder } from './InitiativeOrder';

describe('InitiativeOrder', () => {
  describe('constructor, getCurrentId, getItems, getRound', () => {
    it('should construct with default data', () => {
      const subject = new InitiativeOrder();

      expect(subject.getCurrentId()).toEqual('');
      expect(subject.getItems()).toEqual([]);
      expect(subject.getRound()).toEqual(1);
    });
  });

  describe('getState', () => {
    it('formats state', () => {
      const subject = new InitiativeOrder();
      const result = subject.getState();
  
      expect(result.currentId).toEqual('');
      expect(result.items).toEqual([]);
      expect(result.round).toEqual(1);
    });
  });

  describe('hide', () => {
    it('hides an item', () => {
      const subject = new InitiativeOrder();

      const item: InitiativeItem = {
        entityId: '2',
        entityType: EntityType.CREATURE,
        id: '1',
        imageSrc: '/',
        name: 'Test name',
        resourceA: 2,
        resourceB: 3,
        sortValue: 4,
        visibilityState: VisibilityState.ON
      };

      subject.setItems([ item ]);
      subject.hide('1');

      const found = subject.getItems()[0];

      expect(found.visibilityState).toEqual(VisibilityState.HIDDEN);
    });
  });

  describe('next', () => {
    it('progresses forward', () => {
      const subject = new InitiativeOrder();

      const itemA: InitiativeItem = {
        entityId: '2',
        entityType: EntityType.CREATURE,
        id: '1',
        imageSrc: '/',
        name: 'Test name',
        resourceA: 2,
        resourceB: 3,
        sortValue: 5,
        visibilityState: VisibilityState.HIDDEN
      };

      const itemB: InitiativeItem = {
        entityId: '2',
        entityType: EntityType.CREATURE,
        id: '2',
        imageSrc: '/',
        name: 'Test name',
        resourceA: 2,
        resourceB: 3,
        sortValue: 4,
        visibilityState: VisibilityState.HIDDEN
      };

      subject.setItems([ itemA, itemB ]);
      subject.setCurrentId('1');
      subject.next();

      expect(subject.getCurrentId()).toEqual('2');
    });

    it('progresses forward and skips removed', () => {
      const subject = new InitiativeOrder();

      const itemA: InitiativeItem = {
        entityId: '2',
        entityType: EntityType.CREATURE,
        id: '1',
        imageSrc: '/',
        name: 'Test name',
        resourceA: 2,
        resourceB: 3,
        sortValue: 5,
        visibilityState: VisibilityState.HIDDEN
      };

      const itemB: InitiativeItem = {
        entityId: '2',
        entityType: EntityType.CREATURE,
        id: '2',
        imageSrc: '/',
        name: 'Test name',
        resourceA: 2,
        resourceB: 3,
        sortValue: 4,
        visibilityState: VisibilityState.REMOVED
      };

      const itemC: InitiativeItem = {
        entityId: '2',
        entityType: EntityType.CREATURE,
        id: '3',
        imageSrc: '/',
        name: 'Test name',
        resourceA: 2,
        resourceB: 3,
        sortValue: 3,
        visibilityState: VisibilityState.HIDDEN
      };

      subject.setItems([ itemA, itemB, itemC ]);
      subject.setCurrentId('1');
      subject.next();

      expect(subject.getCurrentId()).toEqual('3');
    });

    it('progresses forward and starts a new round', () => {
      const subject = new InitiativeOrder();

      const itemA: InitiativeItem = {
        entityId: '2',
        entityType: EntityType.CREATURE,
        id: '1',
        imageSrc: '/',
        name: 'Test name',
        resourceA: 2,
        resourceB: 3,
        sortValue: 5,
        visibilityState: VisibilityState.HIDDEN
      };

      const itemB: InitiativeItem = {
        entityId: '2',
        entityType: EntityType.CREATURE,
        id: '2',
        imageSrc: '/',
        name: 'Test name',
        resourceA: 2,
        resourceB: 3,
        sortValue: 4,
        visibilityState: VisibilityState.REMOVED
      };

      subject.setItems([ itemA, itemB ]);
      subject.setCurrentId('2');
      subject.next();

      expect(subject.getCurrentId()).toEqual('1');
      expect(subject.getRound()).toEqual(2);
    });
  });

  describe('prev', () => {
    it('progresses backwards', () => {
      const subject = new InitiativeOrder();

      const itemA: InitiativeItem = {
        entityId: '2',
        entityType: EntityType.CREATURE,
        id: '1',
        imageSrc: '/',
        name: 'Test name',
        resourceA: 2,
        resourceB: 3,
        sortValue: 5,
        visibilityState: VisibilityState.HIDDEN
      };

      const itemB: InitiativeItem = {
        entityId: '2',
        entityType: EntityType.CREATURE,
        id: '2',
        imageSrc: '/',
        name: 'Test name',
        resourceA: 2,
        resourceB: 3,
        sortValue: 4,
        visibilityState: VisibilityState.HIDDEN
      };

      subject.setItems([ itemA, itemB ]);
      subject.setCurrentId('2');
      subject.prev();

      expect(subject.getCurrentId()).toEqual('1');
    });

    it('progresses backwards and skips removed', () => {
      const subject = new InitiativeOrder();

      const itemA: InitiativeItem = {
        entityId: '2',
        entityType: EntityType.CREATURE,
        id: '1',
        imageSrc: '/',
        name: 'Test name',
        resourceA: 2,
        resourceB: 3,
        sortValue: 5,
        visibilityState: VisibilityState.HIDDEN
      };

      const itemB: InitiativeItem = {
        entityId: '2',
        entityType: EntityType.CREATURE,
        id: '2',
        imageSrc: '/',
        name: 'Test name',
        resourceA: 2,
        resourceB: 3,
        sortValue: 4,
        visibilityState: VisibilityState.REMOVED
      };

      const itemC: InitiativeItem = {
        entityId: '2',
        entityType: EntityType.CREATURE,
        id: '3',
        imageSrc: '/',
        name: 'Test name',
        resourceA: 2,
        resourceB: 3,
        sortValue: 3,
        visibilityState: VisibilityState.HIDDEN
      };

      subject.setItems([ itemA, itemB, itemC ]);
      subject.setCurrentId('3');
      subject.prev();

      expect(subject.getCurrentId()).toEqual('1');
    });

    it('progresses backwards and regresses a new round', () => {
      const subject = new InitiativeOrder();

      const itemA: InitiativeItem = {
        entityId: '2',
        entityType: EntityType.CREATURE,
        id: '1',
        imageSrc: '/',
        name: 'Test name',
        resourceA: 2,
        resourceB: 3,
        sortValue: 5,
        visibilityState: VisibilityState.HIDDEN
      };

      const itemB: InitiativeItem = {
        entityId: '2',
        entityType: EntityType.CREATURE,
        id: '2',
        imageSrc: '/',
        name: 'Test name',
        resourceA: 2,
        resourceB: 3,
        sortValue: 4,
        visibilityState: VisibilityState.HIDDEN
      };

      subject.setItems([ itemA, itemB ]);
      subject.setCurrentId('1');
      subject.setRound(2);
      subject.prev();

      expect(subject.getCurrentId()).toEqual('2');
      expect(subject.getRound()).toEqual(1);
    });
  });

  describe('remove', () => {
    it('removes an item', () => {
      const subject = new InitiativeOrder();

      const item: InitiativeItem = {
        entityId: '2',
        entityType: EntityType.CREATURE,
        id: '1',
        imageSrc: '/',
        name: 'Test name',
        resourceA: 2,
        resourceB: 3,
        sortValue: 4,
        visibilityState: VisibilityState.HIDDEN
      };

      subject.setItems([ item ]);
      subject.remove('1');

      const found = subject.getItems()[0];

      expect(found.visibilityState).toEqual(VisibilityState.REMOVED);
    });

    it('does not remove if the id is not equal', () => {
      const subject = new InitiativeOrder();

      const item: InitiativeItem = {
        entityId: '2',
        entityType: EntityType.CREATURE,
        id: '1',
        imageSrc: '/',
        name: 'Test name',
        resourceA: 2,
        resourceB: 3,
        sortValue: 4,
        visibilityState: VisibilityState.HIDDEN
      };

      subject.setItems([ item ]);
      subject.remove('111111');

      const found = subject.getItems()[0];

      expect(found.visibilityState).toEqual(VisibilityState.HIDDEN);
    });

    it('moves next if the current is removed', () => {
      const subject = new InitiativeOrder();

      const itemA: InitiativeItem = {
        entityId: '2',
        entityType: EntityType.CREATURE,
        id: '1',
        imageSrc: '/',
        name: 'Test name',
        resourceA: 2,
        resourceB: 3,
        sortValue: 5,
        visibilityState: VisibilityState.HIDDEN
      };

      const itemB: InitiativeItem = {
        entityId: '2',
        entityType: EntityType.CREATURE,
        id: '2',
        imageSrc: '/',
        name: 'Test name',
        resourceA: 2,
        resourceB: 3,
        sortValue: 4,
        visibilityState: VisibilityState.HIDDEN
      };

      subject.setItems([ itemA, itemB ]);
      subject.setCurrentId('1');
      subject.remove('1');

      expect(subject.getCurrentId()).toEqual('2');
    });
  });

  describe('reset', () => {
    it('resets the class state', () => {
      const subject = new InitiativeOrder();

      const item: InitiativeItem = {
        entityId: '2',
        entityType: EntityType.CREATURE,
        id: '1',
        imageSrc: '/',
        name: 'Test name',
        resourceA: 2,
        resourceB: 3,
        sortValue: 4,
        visibilityState: VisibilityState.HIDDEN
      };

      subject.setCurrentId('1'),
      subject.setItems([ item ]);
      subject.setRound(2);

      subject.reset();

      expect(subject.getCurrentId()).toEqual('');
      expect(subject.getItems()).toEqual([]);
      expect(subject.getRound()).toEqual(1);
    });
  });

  describe('reveal', () => {
    it('reveals an item', () => {
      const subject = new InitiativeOrder();

      const item: InitiativeItem = {
        entityId: '2',
        entityType: EntityType.CREATURE,
        id: '1',
        imageSrc: '/',
        name: 'Test name',
        resourceA: 2,
        resourceB: 3,
        sortValue: 4,
        visibilityState: VisibilityState.HIDDEN
      };

      subject.setItems([ item ]);
      subject.reveal('1');

      const found = subject.getItems()[0];

      expect(found.visibilityState).toEqual(VisibilityState.ON);
    });
  });

  describe('setItems', () => {
    it('sets items', () => {
      const subject = new InitiativeOrder();

      const item: InitiativeItem = {
        entityId: '2',
        entityType: EntityType.CREATURE,
        id: '1',
        imageSrc: '/',
        name: 'Test name',
        resourceA: 2,
        resourceB: 3,
        sortValue: 4,
        visibilityState: VisibilityState.HIDDEN
      };

      subject.setItems([ item ]);

      const found = subject.getItems()[0];

      expect(found.entityId).toEqual(item.entityId);
      expect(found.entityType).toEqual(item.entityType);
      expect(found.id).toEqual(item.id);
      expect(found.imageSrc).toEqual(item.imageSrc);
      expect(found.name).toEqual(item.name);
      expect(found.resourceA).toEqual(item.resourceA);
      expect(found.resourceB).toEqual(item.resourceB);
      expect(found.sortValue).toEqual(item.sortValue);
      expect(found.visibilityState).toEqual(item.visibilityState);
    });
  });

  describe('setResourceA', () => {
    it('sets setResourceA', () => {
      const subject = new InitiativeOrder();

      const item: InitiativeItem = {
        entityId: '2',
        entityType: EntityType.CREATURE,
        id: '1',
        imageSrc: '/',
        name: 'Test name',
        resourceA: 2,
        resourceB: 3,
        sortValue: 4,
        visibilityState: VisibilityState.HIDDEN
      };

      subject.setItems([ item ]);
      subject.setResourceA('1', 11);

      const found = subject.getItems()[0];

      expect(found.resourceA).toEqual(11);
    });
  });

  describe('setResourceB', () => {
    it('sets setResourceB', () => {
      const subject = new InitiativeOrder();

      const item: InitiativeItem = {
        entityId: '2',
        entityType: EntityType.CREATURE,
        id: '1',
        imageSrc: '/',
        name: 'Test name',
        resourceA: 2,
        resourceB: 3,
        sortValue: 4,
        visibilityState: VisibilityState.HIDDEN
      };

      subject.setItems([ item ]);
      subject.setResourceB('1', 22);

      const found = subject.getItems()[0];

      expect(found.resourceB).toEqual(22);
    });
  });

  describe('setRound', () => {
    it('sets the round', () => {
      const subject = new InitiativeOrder();
      
      subject.setRound(3);

      expect(subject.getRound()).toEqual(3);
    });
  });

  describe('setSortValue', () => {
    it('sets sortValue', () => {
      const subject = new InitiativeOrder();

      const item: InitiativeItem = {
        entityId: '2',
        entityType: EntityType.CREATURE,
        id: '1',
        imageSrc: '/',
        name: 'Test name',
        resourceA: 2,
        resourceB: 3,
        sortValue: 4,
        visibilityState: VisibilityState.HIDDEN
      };

      subject.setItems([ item ]);
      subject.setSortValue('1', 44);

      const found = subject.getItems()[0];

      expect(found.sortValue).toEqual(44);
    });
  });

  describe('sort', () => {
    it('sorts and sets currentId if not set', () => {
      const subject = new InitiativeOrder();

      const itemA: InitiativeItem = {
        entityId: '2',
        entityType: EntityType.CREATURE,
        id: '1',
        imageSrc: '/',
        name: 'Test name',
        resourceA: 2,
        resourceB: 3,
        sortValue: 3,
        visibilityState: VisibilityState.HIDDEN
      };

      const itemB: InitiativeItem = {
        entityId: '2',
        entityType: EntityType.CREATURE,
        id: '2',
        imageSrc: '/',
        name: 'Test name',
        resourceA: 2,
        resourceB: 3,
        sortValue: 3,
        visibilityState: VisibilityState.HIDDEN
      };

      const itemC: InitiativeItem = {
        entityId: '2',
        entityType: EntityType.CREATURE,
        id: '3',
        imageSrc: '/',
        name: 'Test name',
        resourceA: 2,
        resourceB: 3,
        sortValue: 13,
        visibilityState: VisibilityState.HIDDEN
      };

      const itemD: InitiativeItem = {
        entityId: '2',
        entityType: EntityType.CREATURE,
        id: '4',
        imageSrc: '/',
        name: 'Test name',
        resourceA: 2,
        resourceB: 3,
        sortValue: 12,
        visibilityState: VisibilityState.HIDDEN
      };

      subject.setItems([ itemA, itemB, itemC, itemD ]);
      subject.sort();

      const items = subject.getItems();


      expect(items[0].id).toEqual('3');
      expect(items[0].sortValue).toEqual(13);

      expect(items[1].id).toEqual('4');
      expect(items[1].sortValue).toEqual(12);

      expect(items[2].id).toEqual('1');
      expect(items[2].sortValue).toEqual(3);

      expect(items[3].id).toEqual('2');
      expect(items[3].sortValue).toEqual(3);

      expect(subject.getCurrentId()).toEqual('3');
    });
  });

  it('does not set currentId if it is set', () => {
    const subject = new InitiativeOrder();

    const itemA: InitiativeItem = {
      entityId: '2',
      entityType: EntityType.CREATURE,
      id: '1',
      imageSrc: '/',
      name: 'Test name',
      resourceA: 2,
      resourceB: 3,
      sortValue: 4,
      visibilityState: VisibilityState.HIDDEN
    };

    const itemB: InitiativeItem = {
      entityId: '2',
      entityType: EntityType.CREATURE,
      id: '2',
      imageSrc: '/',
      name: 'Test name',
      resourceA: 2,
      resourceB: 3,
      sortValue: 12,
      visibilityState: VisibilityState.HIDDEN
    };

    const itemC: InitiativeItem = {
      entityId: '2',
      entityType: EntityType.CREATURE,
      id: '3',
      imageSrc: '/',
      name: 'Test name',
      resourceA: 2,
      resourceB: 3,
      sortValue: 13,
      visibilityState: VisibilityState.HIDDEN
    };

    subject.setItems([ itemA, itemB, itemC ]);
    subject.setCurrentId('2');
    subject.sort();

    const items = subject.getItems();


    expect(items[0].id).toEqual('3');
    expect(items[0].sortValue).toEqual(13);

    expect(items[1].id).toEqual('2');
    expect(items[1].sortValue).toEqual(12);

    expect(items[2].id).toEqual('1');
    expect(items[2].sortValue).toEqual(4);

    expect(subject.getCurrentId()).toEqual('2');
  });
});