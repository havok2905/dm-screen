import {
  Initiative
} from '../sequelize/db';
import {
  InitiativeResponse
} from '../responses';

import { InitiativeService } from './InitiativeService';

describe('InitiativeService', () => {
  describe('bootstrapInitiativeByAdventureId', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('should create a new initiative record if one does not exist', async () => {  
      jest.spyOn(Initiative, 'findAll').mockImplementation(() => {
        return new Promise((resolve) => {
          resolve([]);
        });
      })

      jest.spyOn(Initiative, 'create').mockImplementation((initiative) => {
        return new Promise((resolve) => {
          resolve(Initiative.build(initiative));
        })
      });
  
      const result: InitiativeResponse = await InitiativeService.bootstrapInitiativeByAdventureId('1') as InitiativeResponse;
      
      expect(result.adventureid).toEqual('1');
      expect(result.initiativeOrderState.currentId).toEqual('');
      expect(result.initiativeOrderState.items).toEqual([]);
      expect(result.initiativeOrderState.round).toEqual(1);
    });

    it('should not create a new initiative record if one does exist', async () => {
      jest.spyOn(Initiative, 'findAll').mockImplementation(() => {
        return new Promise((resolve) => {
          resolve([
            Initiative.build({
              id: '1',
              adventureid: '1',
              initiativeOrderState: JSON.stringify({
                currentId: '',
                items: [],
                round: 1
              })
            })
          ]);
        });
      });

      jest.spyOn(Initiative, 'create').mockImplementation((initiative) => {
        return new Promise((resolve) => {
          resolve(Initiative.build(initiative));
        })
      });
  
      const result: InitiativeResponse = await InitiativeService.bootstrapInitiativeByAdventureId('1') as InitiativeResponse;
      
      expect(Initiative.create).toHaveBeenCalledTimes(0);
      expect(result).toEqual(null);
    })
  });

  describe('destroyInitiativeById', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should delete', async () => {
      const destroy = jest.fn();
      const save = jest.fn();

      jest.spyOn(Initiative, 'findOne').mockImplementation(() => {
        return new Promise((resolve) => {
          const initiative = Initiative.build({
            id: '1',
            adventureid: '1',
            initiativeOrderState: JSON.stringify({
              currentId: '',
              items: [],
              round: 1
            })
          });

          initiative.destroy = destroy;
          initiative.save = save;

          resolve(initiative);
        });
      });

      const result = await InitiativeService.destroyInitiativeById('1');

      expect(result).toEqual(true);
      expect(destroy).toHaveBeenCalledTimes(1);
      expect(save).toHaveBeenCalledTimes(1);
    });

    it('should not delete delete', async () => {
      jest.spyOn(Initiative, 'findOne').mockImplementation(() => {
        return new Promise((resolve) => {
          resolve(null);
        });
      });

      const result = await InitiativeService.destroyInitiativeById('1');

      expect(result).toEqual(false);
    });
  });

  describe('getInitiativeByAdventureId', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should fetch an initiative', async () => {
      jest.spyOn(Initiative, 'findOne').mockImplementation(() => {
        return new Promise((resolve) => {
          const initiative = Initiative.build({
            id: '1',
            adventureid: '1',
            initiativeOrderState: JSON.stringify({
              currentId: '',
              items: [],
              round: 1
            })
          });

          resolve(initiative);
        });
      });

      const result: InitiativeResponse = await InitiativeService.getInitiativeByAdventureId('1') as InitiativeResponse;

      expect(result.adventureid).toEqual('1');
      expect(result.initiativeOrderState.currentId).toEqual('');
      expect(result.initiativeOrderState.items).toEqual([]);
      expect(result.initiativeOrderState.round).toEqual(1);
    });

    it('should return null if none are found', async () => {
      jest.spyOn(Initiative, 'findOne').mockImplementation(() => {
        return new Promise((resolve) => {
          resolve(null);
        });
      });

      const result = await InitiativeService.getInitiativeByAdventureId('1') as null;

      expect(result).toEqual(null);
    });
  });

  describe('updateInitiativeById', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should update', async () => {
      const update = jest.fn();
      const save = jest.fn();
  
      jest.spyOn(Initiative, 'findOne').mockImplementation(() => {
        return new Promise((resolve) => {
          const initiative = Initiative.build({
            id: '1',
            adventureid: '1',
            initiativeOrderState: JSON.stringify({
              currentId: '',
              items: [],
              round: 1
            })
          });

          initiative.update = update;
          initiative.save = save;
  
          resolve(initiative);
        });
      });

      const result = await InitiativeService.updateInitiativeById('1', {
        initiativeOrderState: '{"currentId":"","items":[],"round":2}'
      }) as InitiativeResponse;

      expect(result.adventureid).toEqual('1');
      expect(update).toHaveBeenCalledTimes(1);
      expect(save).toHaveBeenCalledTimes(1);
    });

    it('should not update when a record is not found', async () => {
      const update = jest.fn();
      const save = jest.fn();
  
      jest.spyOn(Initiative, 'findOne').mockImplementation(() => {
        return new Promise((resolve) => {
          resolve(null);
        });
      });

      const result = await InitiativeService.updateInitiativeById('1', {
        initiativeOrderState: '{"currentId":"","items":[],"round":2}'
      }) as null;

      expect(result).toEqual(null);
      expect(update).toHaveBeenCalledTimes(0);
      expect(save).toHaveBeenCalledTimes(0);
    });
  });
});