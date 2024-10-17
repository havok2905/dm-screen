import fs from 'fs';

import {
  CreatureNotFoundException,
  CreaturesNotFoundException,
  MissingArgumentException
} from '../exceptions';

import { Creature } from '../sequelize/db';
import { CreatureResponse } from '../responses';
import { CreatureService } from './CreatureService';
import { UpdateCreatureRequest } from '../requests';

describe('CreatureService', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  describe('destroyCreatureById', () => {
    it('should destroy a creature', async () => {
      jest.spyOn(fs, 'unlinkSync').mockImplementation();
      jest.spyOn(fs, 'existsSync').mockImplementation(jest.fn(() => {
        return true;
      }));

      const mockCreature = Creature.build({
        id: '1',
        name: 'Foo',
        content: 'content A',
      });

      jest.spyOn(Creature, 'findOne').mockImplementation(() => {
        return new Promise((resolve) => {
          resolve(mockCreature);
        });
      });

      jest.spyOn(mockCreature, 'destroy').mockImplementation(jest.fn());
      jest.spyOn(mockCreature, 'save').mockImplementation(jest.fn());

      const result = await CreatureService.destroyCreatureById('1');

      expect(result).toEqual(true);
    });

    it('should throw when none are found', () => {
      jest.spyOn(Creature, 'findOne').mockImplementation(() => {
        return new Promise((resolve) => {
          resolve(null);
        });
      });

      expect(async () => {
        await CreatureService.destroyCreatureById('1');
      }).rejects.toThrow(CreatureNotFoundException);
    });

    it('should throw for bad arguments', () => {
      expect(async () => {
        await CreatureService.destroyCreatureById('');
      }).rejects.toThrow(MissingArgumentException);
    });
  });
  
  describe('getEquipmentItems', () => {
    it('should fetch creatures and format it into an api response', async () => {
      const mockCreatures = [
        Creature.build({
          id: 'dcc17f12-c9ce-4529-994d-dd705e5e5fab',
          adventureid: '68c8bd92-04ff-4359-9856-8d2d6b02b69b',
          name: 'Playful Kitten',
          image: '/token-playful-kitten.png',
          metadata: JSON.stringify([
            {
              name: 'Type',
              type: 'string',
              value: 'Beast'
            },
            {
              name: 'AC',
              type: 'number',
              value: 15
            },
            {
              name: 'HP',
              type: 'number',
              value: 25
            },
            {
              name: 'CR',
              type: 'string',
              value: '1/2'
            }
          ]),
          content: '# Playful Kitten'
        })
      ];
  
      jest.spyOn(Creature, 'findAll').mockImplementation(() => {
        return new Promise((resolve) => {
          resolve(mockCreatures);
        });
      });
  
      const result: CreatureResponse[] = await CreatureService.getCreatures();
  
      expect(result.length).toEqual(1);

      expect(result[0].content).toEqual(mockCreatures[0].dataValues.content);
      expect(result[0].id).toEqual(mockCreatures[0].dataValues.id);
      expect(result[0].image).toEqual(mockCreatures[0].dataValues.image);
      expect(result[0].metadata).toEqual(JSON.parse(mockCreatures[0].dataValues.metadata));
      expect(result[0].name).toEqual(mockCreatures[0].dataValues.name);
    });

    it('should throw when none are found', () => {
      jest.spyOn(Creature, 'findAll').mockImplementation(() => {
        return new Promise((resolve) => {
          resolve([]);
        });
      });

      expect(async () => {
        await CreatureService.getCreatures();
      }).rejects.toThrow(CreaturesNotFoundException);
    });
  });

  describe('getCreatureById', () => {
    it('should fetch creature item and format it into an api response', async () => {
      const mockCreature = Creature.build({
        id: 'dcc17f12-c9ce-4529-994d-dd705e5e5fab',
        adventureid: '68c8bd92-04ff-4359-9856-8d2d6b02b69b',
        name: 'Playful Kitten',
        image: '/token-playful-kitten.png',
        metadata: JSON.stringify([
          {
            name: 'Type',
            type: 'string',
            value: 'Beast'
          },
          {
            name: 'AC',
            type: 'number',
            value: 15
          },
          {
            name: 'HP',
            type: 'number',
            value: 25
          },
          {
            name: 'CR',
            type: 'string',
            value: '1/2'
          }
        ]),
        content: '# Playful Kitten'
      });
  
      jest.spyOn(Creature, 'findOne').mockImplementation(() => {
        return new Promise((resolve) => {
          resolve(mockCreature);
        });
      });
  
      const result: CreatureResponse = await CreatureService.getCreatureById('1');
  
      expect(result.id).toEqual(mockCreature.dataValues.id);
      expect(result.adventureid).toEqual(mockCreature.dataValues.adventureid);
      expect(result.name).toEqual(mockCreature.dataValues.name);
      expect(result.image).toEqual(mockCreature.dataValues.image);
    });

    it('should throw when none are found', () => {
      jest.spyOn(Creature, 'findOne').mockImplementation(() => {
        return new Promise((resolve) => {
          resolve(null);
        });
      });

      expect(async () => {
        await CreatureService.getCreatureById('1');
      }).rejects.toThrow(CreatureNotFoundException);
    });

    it('should throw for bad arguments', () => {
      expect(async () => {
        await CreatureService.getCreatureById('');
      }).rejects.toThrow(MissingArgumentException);
    });
  });

  describe('updateCreatureById', () => {
    it('should update a creature', async () => {
      const mockCreature = Creature.build({
        content: '# Hello',
        id: '1',
        image: '/',
        metadata: [],
        name: 'Foo Adventure',
      });

      jest.spyOn(Creature, 'findOne').mockImplementation(() => {
        return new Promise((resolve) => {
          resolve(mockCreature);
        });
      });

      jest.spyOn(mockCreature, 'update').mockImplementation((newData) => {
        mockCreature.setDataValue('content', newData.content);
        mockCreature.setDataValue('image', newData.image);
        mockCreature.setDataValue('metadata', newData.metadata);
        mockCreature.setDataValue('name', newData.name);

        return new Promise<void>((resolve) => {
          resolve();
        });
      });

      const response = await CreatureService.updateCreatureById(
        '1',
        new UpdateCreatureRequest(
          '# Test',
          '1',
          '/test.png',
          [],
          'Test Name'
        )
      );

      expect(response.content).toEqual('# Test');
      expect(response.id).toEqual('1');
      expect(response.image).toEqual('/test.png');
      expect(response.metadata).toEqual([]);
      expect(response.name).toEqual('Test Name');
    });

    it('should throw when none are found', () => {
      jest.spyOn(Creature, 'findOne').mockImplementation(() => {
        return new Promise((resolve) => {
          resolve(null);
        });
      });

      expect(async () => {
        await CreatureService.updateCreatureById('1', new UpdateCreatureRequest(
          '# Hello',
          '1',
          '/',
          [],
          'Name'
        ));
      }).rejects.toThrow(CreatureNotFoundException);
    });

    it('should throw for bad arguments', () => {
      expect(async () => {
        await CreatureService.updateCreatureById('', new UpdateCreatureRequest(
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
