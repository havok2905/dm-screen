import { AdventureItem } from '../sequelize/db';
import { AdventureItemResponse } from '../responses';
import { AdventureItemService } from './AdventureItemService';

import {
  AdventureItemNotFoundException,
  MissingArgumentException
} from '../exceptions';
import {UpdateAdventureItemRequest} from '../requests';

describe('AdventureItemService', () => {
  describe('destroyAdventureItemById', () => {
    it('should destroy an adventure', async () => {
      const mockAdventureItem = AdventureItem.build({
        id: '1',
        name: 'Foo',
        content: 'content A',
      });

      jest.spyOn(AdventureItem, 'findOne').mockImplementation(() => {
        return new Promise((resolve) => {
          resolve(mockAdventureItem);
        });
      });

      jest.spyOn(mockAdventureItem, 'destroy').mockImplementation(jest.fn());
      jest.spyOn(mockAdventureItem, 'save').mockImplementation(jest.fn());

      const result = await AdventureItemService.destroyAdventureItemById('1');

      expect(result).toEqual(true);
    });

    it('should throw when none are found', () => {
      jest.spyOn(AdventureItem, 'findOne').mockImplementation(() => {
        return new Promise((resolve) => {
          resolve(null);
        });
      });

      expect(async () => {
        await AdventureItemService.destroyAdventureItemById('1');
      }).rejects.toThrow(AdventureItemNotFoundException);
    });

    it('should throw for bad arguments', () => {
      expect(async () => {
        await AdventureItemService.destroyAdventureItemById('');
      }).rejects.toThrow(MissingArgumentException);
    });
  });

  describe('getAdventureItemById', () => {
    it('should fetch adventure item and format it into an api response', async () => {
      const mockAdventureItem = AdventureItem.build({
        id: '8c1d96db-2b9b-457d-ba59-7d7132ded9bd',
        adventureid: '68c8bd92-04ff-4359-9856-8d2d6b02b69b',
        name: 'Dagger',
        image: '/dagger.png',
        metadata: JSON.stringify([
          {
            name: 'Rarity',
            type: 'string',
            value: 'Common',
          }
        ]),
        content: '# Dagger'
      });
  
      jest.spyOn(AdventureItem, 'findOne').mockImplementation(() => {
        return new Promise((resolve) => {
          resolve(mockAdventureItem);
        });
      });
  
      const result: AdventureItemResponse = await AdventureItemService.getAdventureItemById('1');
  
      expect(result.id).toEqual(mockAdventureItem.dataValues.id);
      expect(result.adventureid).toEqual(mockAdventureItem.dataValues.adventureid);
      expect(result.name).toEqual(mockAdventureItem.dataValues.name);
      expect(result.image).toEqual(mockAdventureItem.dataValues.image);
      expect(result.metadata[0].name).toEqual('Rarity');
      expect(result.metadata[0].type).toEqual('string');
      expect(result.metadata[0].value).toEqual('Common');
    });

    it('should throw when none are found', () => {
      jest.spyOn(AdventureItem, 'findOne').mockImplementation(() => {
        return new Promise((resolve) => {
          resolve(null);
        });
      });

      expect(async () => {
        await AdventureItemService.getAdventureItemById('1');
      }).rejects.toThrow(AdventureItemNotFoundException);
    });

    it('should throw for bad arguments', () => {
      expect(async () => {
        await AdventureItemService.getAdventureItemById('');
      }).rejects.toThrow(MissingArgumentException);
    });
  });

  describe('updateAdventureItemById', () => {
    it('should update an adventure item', async () => {
      const mockAdventureItem = AdventureItem.build({
        adventureid: '1',
        content: '# Hello',
        id: '1',
        image: '/',
        metadata: [],
        name: 'Foo Adventure',
      });

      jest.spyOn(AdventureItem, 'findOne').mockImplementation(() => {
        return new Promise((resolve) => {
          resolve(mockAdventureItem);
        });
      });

      jest.spyOn(mockAdventureItem, 'update').mockImplementation((newData) => {
        mockAdventureItem.setDataValue('adventureid', newData.adventureid);
        mockAdventureItem.setDataValue('content', newData.content);
        mockAdventureItem.setDataValue('image', newData.image);
        mockAdventureItem.setDataValue('metadata', newData.metadata);
        mockAdventureItem.setDataValue('name', newData.name);

        return new Promise<void>((resolve) => {
          resolve();
        });
      });

      const response = await AdventureItemService.updateAdventureItemById(
        '1',
        new UpdateAdventureItemRequest(
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
      jest.spyOn(AdventureItem, 'findOne').mockImplementation(() => {
        return new Promise((resolve) => {
          resolve(null);
        });
      });

      expect(async () => {
        await AdventureItemService.updateAdventureItemById('1', new UpdateAdventureItemRequest(
          '1',
          '# Hello',
          '1',
          '/',
          [],
          'Name'
        ));
      }).rejects.toThrow(AdventureItemNotFoundException);
    });

    it('should throw for bad arguments', () => {
      expect(async () => {
        await AdventureItemService.updateAdventureItemById('', new UpdateAdventureItemRequest(
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
