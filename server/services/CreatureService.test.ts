import { Creature } from '../sequelize/db';
import { CreatureResponse } from '../responses';
import { CreatureService } from './CreatureService';
import { CreaturesNotFoundException } from '../exceptions';

describe('CreatureService', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
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
});