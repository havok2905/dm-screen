import {
  MissingArgumentException,
  SpellNotFoundException,
  SpellsNotFoundException
} from '../exceptions';

import { Spell } from '../sequelize/db';
import { SpellResponse } from '../responses';
import { SpellService } from './SpellService';

describe('SpellService', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });
  
  describe('getSpells', () => {
    it('should fetch spell items and format it into an api response', async () => {
      const mcokSpells = [
        Spell.build({
          id: '8c1d96db-2b9b-457d-ba59-7d7132ded9bd',
          name: 'Firebolt',
          image: '/firebolt.png',
          metadata: JSON.stringify([
            {
              name: 'Level',
              type: 'number',
              value: 0,
            }
          ]),
          content: '# Firebolt'
        })
      ];
  
      jest.spyOn(Spell, 'findAll').mockImplementation(() => {
        return new Promise((resolve) => {
          resolve(mcokSpells);
        });
      });
  
      const result: SpellResponse[] = await SpellService.getSpells();
  
      expect(result.length).toEqual(1);

      expect(result[0].content).toEqual(mcokSpells[0].dataValues.content);
      expect(result[0].id).toEqual(mcokSpells[0].dataValues.id);
      expect(result[0].image).toEqual(mcokSpells[0].dataValues.image);
      expect(result[0].metadata).toEqual(JSON.parse(mcokSpells[0].dataValues.metadata));
      expect(result[0].name).toEqual(mcokSpells[0].dataValues.name);
    });

    it('should throw when none are found', () => {
      jest.spyOn(Spell, 'findAll').mockImplementation(() => {
        return new Promise((resolve) => {
          resolve([]);
        });
      });

      expect(async () => {
        await SpellService.getSpells();
      }).rejects.toThrow(SpellsNotFoundException);
    });
  });

  describe('getSpellByID', () => {
    it('should fetch spell item and format it into an api response', async () => {
      const mockSpell = Spell.build({
        id: '8c1d96db-2b9b-457d-ba59-7d7132ded9bd',
        name: 'Firebolt',
        image: '/firebolt.png',
        metadata: JSON.stringify([
          {
            name: 'Level',
            type: 'number',
            value: 0,
          }
        ]),
        content: '# Firebolt'
      });
  
      jest.spyOn(Spell, 'findOne').mockImplementation(() => {
        return new Promise((resolve) => {
          resolve(mockSpell);
        });
      });
  
      const result: SpellResponse = await SpellService.getSpellById('1');
  
      expect(result.id).toEqual(mockSpell.dataValues.id);
      expect(result.adventureid).toEqual(mockSpell.dataValues.adventureid);
      expect(result.name).toEqual(mockSpell.dataValues.name);
      expect(result.image).toEqual(mockSpell.dataValues.image);
      expect(result.metadata[0].name).toEqual('Level');
      expect(result.metadata[0].type).toEqual('number');
      expect(result.metadata[0].value).toEqual(0);
    });

    it('should throw when none are found', () => {
      jest.spyOn(Spell, 'findOne').mockImplementation(() => {
        return new Promise((resolve) => {
          resolve(null);
        });
      });

      expect(async () => {
        await SpellService.getSpellById('1');
      }).rejects.toThrow(SpellNotFoundException);
    });

    it('should throw for bad arguments', () => {
      expect(async () => {
        await SpellService.getSpellById('');
      }).rejects.toThrow(MissingArgumentException);
    });
  });
});