import {
  Adventure,
  AdventureCreature,
  AdventureHandout,
  AdventureItem
} from '../sequelize/db';
import {
  AdventureNotFoundException,
  AdventuresNotFoundException,
  MissingArgumentException
} from '../exceptions';
import {
  AdventureResponse,
  AdventuresResponse
} from '../responses';

import { AdventureService } from './AdventureService';
import { UpdateAdventureRequest } from '../requests';

describe('AdventureService', () => {
  describe('getAdventures', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('should fetch adventures and format it into an api response', async () => {
      const mockAdventures = [
        Adventure.build({
          id: '1',
          name: 'Foo Adventure',
          notes: 'notes A',
          system: 'D&D 5e'
        }),
        Adventure.build({
          id: '2',
          name: 'Bar Adventure',
          notes: 'notes B',
          system: 'D&D 5e'
        }),
        Adventure.build({
          id: '3',
          name: 'Baz Adventure',
          notes: 'notes C',
          system: 'D&D 5e'
        })
      ];
  
      jest.spyOn(Adventure, 'findAll').mockImplementation(() => {
        return new Promise((resolve) => {
          resolve(mockAdventures);
        });
      });
  
      const result: AdventuresResponse = await AdventureService.getAdventures();
  
      expect(result.adventures.length).toEqual(3);
  
      expect(result.adventures[0].id).toEqual(mockAdventures[0].dataValues.id);
      expect(result.adventures[0].name).toEqual(mockAdventures[0].dataValues.name);
      expect(result.adventures[0].notes).toEqual(mockAdventures[0].dataValues.notes);
      expect(result.adventures[0].system).toEqual(mockAdventures[0].dataValues.system);
  
      expect(result.adventures[1].id).toEqual(mockAdventures[1].dataValues.id);
      expect(result.adventures[1].name).toEqual(mockAdventures[1].dataValues.name);
      expect(result.adventures[1].notes).toEqual(mockAdventures[1].dataValues.notes);
      expect(result.adventures[1].system).toEqual(mockAdventures[1].dataValues.system);
  
      expect(result.adventures[2].id).toEqual(mockAdventures[2].dataValues.id);
      expect(result.adventures[2].name).toEqual(mockAdventures[2].dataValues.name);
      expect(result.adventures[2].notes).toEqual(mockAdventures[2].dataValues.notes);
      expect(result.adventures[2].system).toEqual(mockAdventures[2].dataValues.system);
    });

    it('should throw when none are found', () => {
      jest.spyOn(Adventure, 'findAll').mockImplementation(() => {
        return new Promise((resolve) => {
          resolve([]);
        });
      });

      expect(async () => {
        await AdventureService.getAdventures();
      }).rejects.toThrow(AdventuresNotFoundException);
    });
  });

  describe('getAdventureById', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('should fetch adventures and format it into an api response', async () => {
      const mockAdventure = Adventure.build({
        id: '1',
        name: 'Foo Adventure',
        notes: 'notes A',
        system: 'D&D 5e'
      });
  
      const mockAdventureCreatures = [
        AdventureCreature.build({
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
          ]),
          content: '# Playful Kitten'
        })
      ];
  
      const mockAdventureHandouts = [
        AdventureHandout.build({
          id: '60f80ded-b9ce-4804-b81a-f796f0961717',
          adventureid: '68c8bd92-04ff-4359-9856-8d2d6b02b69b',
          name: 'Embroidermancer Lair Map',
          description: 'Map of the embroidermancer\'s lair',
          url: '/emboridermancer-map.png'
        })
      ];
  
      const mockAdventureItems = [
        AdventureItem.build({
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
        })
      ];
  
      jest.spyOn(Adventure, 'findOne').mockImplementation(() => {
        return new Promise((resolve) => {
          resolve(mockAdventure);
        });
      });
  
      jest.spyOn(AdventureCreature, 'findAll').mockImplementation(() => {
        return new Promise((resolve) => {
          resolve(mockAdventureCreatures);
        });
      });
  
      jest.spyOn(AdventureHandout, 'findAll').mockImplementation(() => {
        return new Promise((resolve) => {
          resolve(mockAdventureHandouts);
        });
      });
  
      jest.spyOn(AdventureItem, 'findAll').mockImplementation(() => {
        return new Promise((resolve) => {
          resolve(mockAdventureItems);
        });
      });
  
      const result: AdventureResponse = await AdventureService.getAdventureById('1');
  
      expect(result.id).toEqual(mockAdventure.dataValues.id);
      expect(result.name).toEqual(mockAdventure.dataValues.name);
      expect(result.notes).toEqual(mockAdventure.dataValues.notes);
      expect(result.system).toEqual(mockAdventure.dataValues.system);
  
      expect(result.creatures?.[0].id).toEqual(mockAdventureCreatures[0].dataValues.id);
      expect(result.creatures?.[0].adventureid).toEqual(mockAdventureCreatures[0].dataValues.adventureid);
      expect(result.creatures?.[0].name).toEqual(mockAdventureCreatures[0].dataValues.name);
      expect(result.creatures?.[0].image).toEqual(mockAdventureCreatures[0].dataValues.image);
      expect(result.creatures?.[0].content).toEqual(mockAdventureCreatures[0].dataValues.content);
      expect(result.creatures?.[0].metadata[0].name).toEqual('Type');
      expect(result.creatures?.[0].metadata[0].type).toEqual('string');
      expect(result.creatures?.[0].metadata[0].value).toEqual('Beast');
  
      expect(result.handouts?.[0].id).toEqual(mockAdventureHandouts[0].dataValues.id);
      expect(result.handouts?.[0].adventureid).toEqual(mockAdventureHandouts[0].dataValues.adventureid);
      expect(result.handouts?.[0].description).toEqual(mockAdventureHandouts[0].dataValues.description);
      expect(result.handouts?.[0].name).toEqual(mockAdventureHandouts[0].dataValues.name);
      expect(result.handouts?.[0].url).toEqual(mockAdventureHandouts[0].dataValues.url);
  
      expect(result.items?.[0].id).toEqual(mockAdventureItems[0].dataValues.id);
      expect(result.items?.[0].adventureid).toEqual(mockAdventureItems[0].dataValues.adventureid);
      expect(result.items?.[0].name).toEqual(mockAdventureItems[0].dataValues.name);
      expect(result.items?.[0].image).toEqual(mockAdventureItems[0].dataValues.image);
      expect(result.items?.[0].metadata[0].name).toEqual('Rarity');
      expect(result.items?.[0].metadata[0].type).toEqual('string');
      expect(result.items?.[0].metadata[0].value).toEqual('Common');
    });

    it('should throw when none are found', () => {
      jest.spyOn(Adventure, 'findOne').mockImplementation(() => {
        return new Promise((resolve) => {
          resolve(null);
        });
      });

      expect(async () => {
        await AdventureService.getAdventureById('1');
      }).rejects.toThrow(AdventureNotFoundException);
    });

    it('should throw for bad arguments', () => {
      expect(async () => {
        await AdventureService.getAdventureById('');
      }).rejects.toThrow(MissingArgumentException);
    });
  });

  describe('updateAdventureById', () => {
    it('should update an adventure', async () => {
      const mockAdventure = Adventure.build({
        id: '1',
        name: 'Foo Adventure',
        notes: 'notes A',
        system: 'D&D 5e'
      });

      jest.spyOn(Adventure, 'findOne').mockImplementation(() => {
        return new Promise((resolve) => {
          resolve(mockAdventure);
        });
      });

      jest.spyOn(mockAdventure, 'update').mockImplementation((newData) => {
        mockAdventure.setDataValue('description', newData.description);
        mockAdventure.setDataValue('name', newData.name);
        mockAdventure.setDataValue('notes', newData.notes);
        mockAdventure.setDataValue('system', newData.system);

        return new Promise<void>((resolve) => {
          resolve();
        });
      });

      const response = await AdventureService.updateAdventureById(
        '1',
        new UpdateAdventureRequest(
          'Test Description',
          'Test Name',
          '# Test',
          'D&D 2024'
        )
      );

      expect(response.description).toEqual('Test Description');
      expect(response.name).toEqual('Test Name');
      expect(response.notes).toEqual('# Test');
      expect(response.system).toEqual('D&D 2024');
    });

    it('should throw when none are found', () => {
      jest.spyOn(Adventure, 'findOne').mockImplementation(() => {
        return new Promise((resolve) => {
          resolve(null);
        });
      });

      expect(async () => {
        await AdventureService.updateAdventureById('1', new UpdateAdventureRequest(
          '',
          '',
          '',
          ''
        ));
      }).rejects.toThrow(AdventureNotFoundException);
    });

    it('should throw for bad arguments', () => {
      expect(async () => {
        await AdventureService.updateAdventureById('', new UpdateAdventureRequest(
          '',
          '',
          '',
          ''
        ));
      }).rejects.toThrow(MissingArgumentException);
    });
  });
});