import fs from 'fs';

import { AdventurePlayer } from '../sequelize/db';
import { AdventurePlayerService } from './AdventurePlayerService';

import {
  CreateAdventurePlayerRequest,
  UpdateAdventurePlayerRequest
} from '../requests';

import {
  AdventurePlayerNotFoundException,
  AdventurePlayerRequestMalformedException,
  MissingArgumentException
} from '../exceptions';

describe('AdventurePlayerService', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  describe('createAdventurePlayer', () => {
    it('should create an adventure', async () => {
      jest.spyOn(AdventurePlayer, 'create').mockImplementation((obj) => {
        return new Promise((resolve) => {
          resolve({
            dataValues: obj
          });
        });
      });

      const request = new CreateAdventurePlayerRequest(
        10,
        '1',
        'Character Name',
        '1',
        'test.png',
        'Player Name'
      );

      const result = await AdventurePlayerService.createAdventurePlayer(request);

      expect(result.ac).toEqual(10);
      expect(result.adventureid).toEqual('1');
      expect(result.charactername).toEqual('Character Name');
      expect(result.id).toEqual('1');
      expect(result.playername).toEqual('Player Name');
    });

    it('should throw for missing arguments', () => {
      expect(async () => {
        await AdventurePlayerService.createAdventurePlayer(null);
      }).rejects.toThrow(MissingArgumentException);
    });

    it('should throw for bad arguments', () => {
      expect(async () => {
        await AdventurePlayerService.createAdventurePlayer(new CreateAdventurePlayerRequest(
          10,
          '1',
          '',
          '1',
          'test.png',
          ''
        ));
      }).rejects.toThrow(AdventurePlayerRequestMalformedException);
    });
  });

  describe('destroyAdventurePlayerById', () => {
    it('should destroy an adventure', async () => {
      jest.spyOn(fs, 'unlinkSync').mockImplementation();
      jest.spyOn(fs, 'existsSync').mockImplementation(jest.fn(() => {
        return true;
      }));

      const mockAdventurePlayer = AdventurePlayer.build({
        id: '1',
        ac: 10,
        adventureid: '1',
        charactername: 'Foo',
        image: '',
        playername: 'Foo'
      });

      jest.spyOn(AdventurePlayer, 'findOne').mockImplementation(() => {
        return new Promise((resolve) => {
          resolve(mockAdventurePlayer);
        });
      });

      jest.spyOn(mockAdventurePlayer, 'destroy').mockImplementation(jest.fn());
      jest.spyOn(mockAdventurePlayer, 'save').mockImplementation(jest.fn());

      const result = await AdventurePlayerService.destroyAdventurePlayerById('1');

      expect(result).toEqual(true);
    });

    it('should throw when none are found', () => {
      jest.spyOn(AdventurePlayer, 'findOne').mockImplementation(() => {
        return new Promise((resolve) => {
          resolve(null);
        });
      });

      expect(async () => {
        await AdventurePlayerService.destroyAdventurePlayerById('1');
      }).rejects.toThrow(AdventurePlayerNotFoundException);
    });

    it('should throw for bad arguments', () => {
      expect(async () => {
        await AdventurePlayerService.destroyAdventurePlayerById('');
      }).rejects.toThrow(MissingArgumentException);
    });
  });

  describe('updateAdventurePlayerById', () => {
    it('should update an adventure player', async () => {
      const mockAdventurePlayer = AdventurePlayer.build({
        id: '1',
        ac: 10,
        adventureid: '1',
        charactername: 'Character Name',
        image: '',
        playername: 'Player Name'
      });

      jest.spyOn(AdventurePlayer, 'findOne').mockImplementation(() => {
        return new Promise((resolve) => {
          resolve(mockAdventurePlayer);
        });
      });

      jest.spyOn(mockAdventurePlayer, 'update').mockImplementation((newData) => {
        mockAdventurePlayer.setDataValue('ac', newData.ac);
        mockAdventurePlayer.setDataValue('charactername', newData.charactername);
        mockAdventurePlayer.setDataValue('image', newData.image);
        mockAdventurePlayer.setDataValue('playername', newData.playername);

        return new Promise<void>((resolve) => {
          resolve();
        });
      });

      const response = await AdventurePlayerService.updateAdventurePlayerById(
        '1',
        new UpdateAdventurePlayerRequest(
          11,
          '1',
          'Character Name 2',
          '1',
          '/test.png',
          'Player Name 2'
        )
      );

      expect(response.ac).toEqual(11);
      expect(response.adventureid).toEqual('1');
      expect(response.charactername).toEqual('Character Name 2');
      expect(response.id).toEqual('1');
      expect(response.image).toEqual('/test.png');
      expect(response.playername).toEqual('Player Name 2');
    });

    it('should throw when none are found', () => {
      jest.spyOn(AdventurePlayer, 'findOne').mockImplementation(() => {
        return new Promise((resolve) => {
          resolve(null);
        });
      });

      expect(async () => {
        await AdventurePlayerService.updateAdventurePlayerById('1', new UpdateAdventurePlayerRequest(
          11,
          '1',
          'Character Name 2',
          '1',
          '/test.png',
          'Player Name 2'
        ));
      }).rejects.toThrow(AdventurePlayerNotFoundException);
    });

    it('should throw for bad arguments', () => {
      expect(async () => {
        await AdventurePlayerService.updateAdventurePlayerById('', new UpdateAdventurePlayerRequest(
          11,
          '1',
          '',
          '1',
          '/test.png',
          ''
        ));
      }).rejects.toThrow(MissingArgumentException);
    });
  });
});
