import { AdventureHandout } from '../sequelize/db';
import { AdventureHandoutService } from './AdventureHandoutService';
import fs from 'fs';

import {
  AdventureHandoutNotFoundException,
  MissingArgumentException
} from '../exceptions';

describe('AdventureHandoutService', () => {
  describe('destroyAdventureHandoutById', () => {
    it('should destroy an adventure', async () => {
      jest.mock('fs');

      fs.unlinkSync = jest.fn();

      const mockAdventureHandout = AdventureHandout.build({
        id: '1',
        adventureid: '1',
        description: 'description',
        name: 'name',
        url: '/'
      });

      jest.spyOn(AdventureHandout, 'findOne').mockImplementation(() => {
        return new Promise((resolve) => {
          resolve(mockAdventureHandout);
        });
      });

      jest.spyOn(mockAdventureHandout, 'destroy').mockImplementation(jest.fn());
      jest.spyOn(mockAdventureHandout, 'save').mockImplementation(jest.fn());

      const result = await AdventureHandoutService.destroyAdventureHandoutById('1');

      expect(fs.unlinkSync).toHaveBeenCalled();
      expect(result).toEqual(true);
    });

    it('should throw when none are found', () => {
      jest.spyOn(AdventureHandout, 'findOne').mockImplementation(() => {
        return new Promise((resolve) => {
          resolve(null);
        });
      });

      expect(async () => {
        await AdventureHandoutService.destroyAdventureHandoutById('1');
      }).rejects.toThrow(AdventureHandoutNotFoundException);
    });

    it('should throw for bad arguments', () => {
      expect(async () => {
        await AdventureHandoutService.destroyAdventureHandoutById('');
      }).rejects.toThrow(MissingArgumentException);
    });
  });
});