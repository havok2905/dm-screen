import { AdventureCreature } from '../sequelize/db';
import { AdventureCreatureService } from './AdventureCreatureService';

import {
  AdventureCreatureNotFoundException,
  MissingArgumentException
} from '../exceptions';

describe('AdventureCreatureService', () => {
  describe('destroyAdventureCreatureById', () => {
    it('should destroy an adventure', async () => {
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
});
