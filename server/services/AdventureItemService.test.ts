import { AdventureItem } from '../sequelize/db';
import { AdventureItemService } from './AdventureItemService';

import {
  AdventureItemNotFoundException,
  MissingArgumentException
} from '../exceptions';

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
});
