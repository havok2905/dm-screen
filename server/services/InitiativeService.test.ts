import { 
  InitiativeNotFoundException,
  MissingArgumentException
} from '../exceptions';

import { Initiative } from '../sequelize/db';
import { InitiativeResponse } from '../responses';
import { InitiativeService } from './InitiativeService';
import {UpdateInitiativeRequest} from '../requests';

describe('InitiativeService', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  describe('bootstrapInitiativeByAdventureId', () => {
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
    });

    it('should throw when arguments are missing', () => {
      expect(async () => {
        await InitiativeService.bootstrapInitiativeByAdventureId('');
      }).rejects.toThrow(MissingArgumentException);
    });
  });

  describe('destroyInitiativeById', () => {
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

    it('should throw', () => {
      jest.spyOn(Initiative, 'findOne').mockImplementation(() => {
        return new Promise((resolve) => {
          resolve(null);
        });
      });

      expect(async () => {
        await InitiativeService.destroyInitiativeById('1');
      }).rejects.toThrow(InitiativeNotFoundException);
    });

    it('should throw when arguments are missing', () => {
      expect(async () => {
        await InitiativeService.destroyInitiativeById('');
      }).rejects.toThrow(MissingArgumentException);
    });
  });

  describe('getInitiativeByAdventureId', () => {
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

    it('should throw when arguments are missing', () => {
      expect(async () => {
        await InitiativeService.getInitiativeByAdventureId('');
      }).rejects.toThrow(MissingArgumentException);
    });
  });

  describe('updateInitiativeById', () => {
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

      const request = new UpdateInitiativeRequest('{"currentId":"","items":[],"round":2}');
      const result = await InitiativeService.updateInitiativeById('1', request) as InitiativeResponse;

      expect(result.adventureid).toEqual('1');
      expect(update).toHaveBeenCalledTimes(1);
      expect(save).toHaveBeenCalledTimes(1);
    });

    it('should throw when a record is not found', async () => {  
      jest.spyOn(Initiative, 'findOne').mockImplementation(() => {
        return new Promise((resolve) => {
          resolve(null);
        });
      });

      expect(async () => {
        const request = new UpdateInitiativeRequest('{"currentId":"","items":[],"round":2}');
        await InitiativeService.updateInitiativeById('1', request);
      }).rejects.toThrow(InitiativeNotFoundException);
    });

    it('should throw when arguments are missing', () => {
      expect(async () => {
        const request = new UpdateInitiativeRequest('{"currentId":"","items":[],"round":2}');
        await InitiativeService.updateInitiativeById('', request);
      }).rejects.toThrow(MissingArgumentException);
    });
  });
});