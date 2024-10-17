import fs from 'fs';

import { AdventureCreature } from '../sequelize/db';
import { AdventureCreatureResponse } from '../responses';
import { AdventureCreatureService } from './AdventureCreatureService';
import { UpdateAdventureCreatureRequest } from '../requests';

import {
  AdventureCreatureNotFoundException,
  MissingArgumentException
} from '../exceptions';

describe('AdventureCreatureService', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  describe('destroyAdventureCreatureById', () => {
    it('should destroy an adventure', async () => {
      jest.spyOn(fs, 'unlinkSync').mockImplementation();
      jest.spyOn(fs, 'existsSync').mockImplementation(jest.fn(() => {
        return true;
      }));

      const mockAdventureCreature = AdventureCreature.build({
        id: '1',
        name: 'Foo',
        content: 'content A',
      });

      jest.spyOn(AdventureCreature, 'findOne').mockImplementation(() => {
        return new Promise((resolve) => {
          resolve(mockAdventureCreature);
        });
      });

      jest.spyOn(mockAdventureCreature, 'destroy').mockImplementation(jest.fn());
      jest.spyOn(mockAdventureCreature, 'save').mockImplementation(jest.fn());

      const result = await AdventureCreatureService.destroyAdventureCreatureById('1');

      expect(result).toEqual(true);
    });

    it('should throw when none are found', () => {
      jest.spyOn(AdventureCreature, 'findOne').mockImplementation(() => {
        return new Promise((resolve) => {
          resolve(null);
        });
      });

      expect(async () => {
        await AdventureCreatureService.destroyAdventureCreatureById('1');
      }).rejects.toThrow(AdventureCreatureNotFoundException);
    });

    it('should throw for bad arguments', () => {
      expect(async () => {
        await AdventureCreatureService.destroyAdventureCreatureById('');
      }).rejects.toThrow(MissingArgumentException);
    });
  });

  describe('getAdventureCreatureById', () => {
    it('should fetch adventure item and format it into an api response', async () => {
      const mockAdventureCreature = AdventureCreature.build({
        id: '8c1d96db-2b9b-457d-ba59-7d7132ded9bd',
        adventureid: '68c8bd92-04ff-4359-9856-8d2d6b02b69b',
        name: 'Creature',
        image: '/creature.png',
        metadata: JSON.stringify([
          {
            name: 'HP',
            type: 'number',
            value: 10,
          }
        ]),
        content: '# Creature'
      });
  
      jest.spyOn(AdventureCreature, 'findOne').mockImplementation(() => {
        return new Promise((resolve) => {
          resolve(mockAdventureCreature);
        });
      });
  
      const result: AdventureCreatureResponse = await AdventureCreatureService.getAdventureCreatureById('1');
  
      expect(result.id).toEqual(mockAdventureCreature.dataValues.id);
      expect(result.adventureid).toEqual(mockAdventureCreature.dataValues.adventureid);
      expect(result.name).toEqual(mockAdventureCreature.dataValues.name);
      expect(result.image).toEqual(mockAdventureCreature.dataValues.image);
      expect(result.metadata[0].name).toEqual('HP');
      expect(result.metadata[0].type).toEqual('number');
      expect(result.metadata[0].value).toEqual(10);
    });

    it('should throw when none are found', () => {
      jest.spyOn(AdventureCreature, 'findOne').mockImplementation(() => {
        return new Promise((resolve) => {
          resolve(null);
        });
      });

      expect(async () => {
        await AdventureCreatureService.getAdventureCreatureById('1');
      }).rejects.toThrow(AdventureCreatureNotFoundException);
    });

    it('should throw for bad arguments', () => {
      expect(async () => {
        await AdventureCreatureService.getAdventureCreatureById('');
      }).rejects.toThrow(MissingArgumentException);
    });
  });

  describe('updateAdventureItemById', () => {
    it('should update an adventure item', async () => {
      const mockAdventureCreature = AdventureCreature.build({
        adventureid: '1',
        content: '# Hello',
        id: '1',
        image: '/',
        metadata: [],
        name: 'Foo Adventure',
      });

      jest.spyOn(AdventureCreature, 'findOne').mockImplementation(() => {
        return new Promise((resolve) => {
          resolve(mockAdventureCreature);
        });
      });

      jest.spyOn(mockAdventureCreature, 'update').mockImplementation((newData) => {
        mockAdventureCreature.setDataValue('adventureid', newData.adventureid);
        mockAdventureCreature.setDataValue('content', newData.content);
        mockAdventureCreature.setDataValue('image', newData.image);
        mockAdventureCreature.setDataValue('metadata', newData.metadata);
        mockAdventureCreature.setDataValue('name', newData.name);

        return new Promise<void>((resolve) => {
          resolve();
        });
      });

      const response = await AdventureCreatureService.updateAdventureCreatureById(
        '1',
        new UpdateAdventureCreatureRequest(
          '1',
          '# Test',
          '1',
          '/test.png',
          [],
          'Test Name'
        )
      );

      expect(response.adventureid).toEqual('1');
      expect(response.content).toEqual('# Test');
      expect(response.id).toEqual('1');
      expect(response.image).toEqual('/test.png');
      expect(response.metadata).toEqual([]);
      expect(response.name).toEqual('Test Name');
    });

    it('should throw when none are found', () => {
      jest.spyOn(AdventureCreature, 'findOne').mockImplementation(() => {
        return new Promise((resolve) => {
          resolve(null);
        });
      });

      expect(async () => {
        await AdventureCreatureService.updateAdventureCreatureById('1', new UpdateAdventureCreatureRequest(
          '1',
          '# Hello',
          '1',
          '/',
          [],
          'Name'
        ));
      }).rejects.toThrow(AdventureCreatureNotFoundException);
    });

    it('should throw for bad arguments', () => {
      expect(async () => {
        await AdventureCreatureService.updateAdventureCreatureById('', new UpdateAdventureCreatureRequest(
          '',
          '# Hello',
          '',
          '/',
          [],
          ''
        ));
      }).rejects.toThrow(MissingArgumentException);
    });
  });
});
