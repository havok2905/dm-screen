import { EquipmentItem, MagicItem } from '../sequelize/db';
import { ItemResponse } from '../responses';
import { ItemService } from './ItemService';
import { ItemsNotFoundException } from '../exceptions';

describe('ItemService', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });
  
  describe('getEquipmentItems', () => {
    it('should fetch equipment items and format it into an api response', async () => {
      const mockEquipmentItems = [
        EquipmentItem.build({
          id: '8c1d96db-2b9b-457d-ba59-7d7132ded9bd',
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
        }),
        EquipmentItem.build({
          id: '8c1d96db-2b9b-457d-ba59-7d7132ded9be',
          name: 'Dagger 2',
          image: '/dagger2.png',
          metadata: JSON.stringify([
            {
              name: 'Rarity',
              type: 'string',
              value: 'Common',
            }
          ]),
          content: '# Dagge 2'
        }),
        EquipmentItem.build({
          id: '8c1d96db-2b9b-457d-ba59-7d7132ded9bf',
          name: 'Dagger 3',
          image: '/dagger3.png',
          metadata: JSON.stringify([
            {
              name: 'Rarity',
              type: 'string',
              value: 'Common',
            }
          ]),
          content: '# Dagger 3'
        })
      ];
  
      jest.spyOn(EquipmentItem, 'findAll').mockImplementation(() => {
        return new Promise((resolve) => {
          resolve(mockEquipmentItems);
        });
      });
  
      const result: ItemResponse[] = await ItemService.getEquipmentItems();
  
      expect(result.length).toEqual(3);

      expect(result[0].content).toEqual(mockEquipmentItems[0].dataValues.content);
      expect(result[0].id).toEqual(mockEquipmentItems[0].dataValues.id);
      expect(result[0].image).toEqual(mockEquipmentItems[0].dataValues.image);
      expect(result[0].metadata).toEqual(JSON.parse(mockEquipmentItems[0].dataValues.metadata));
      expect(result[0].name).toEqual(mockEquipmentItems[0].dataValues.name);

      expect(result[1].content).toEqual(mockEquipmentItems[1].dataValues.content);
      expect(result[1].id).toEqual(mockEquipmentItems[1].dataValues.id);
      expect(result[1].image).toEqual(mockEquipmentItems[1].dataValues.image);
      expect(result[1].metadata).toEqual(JSON.parse(mockEquipmentItems[1].dataValues.metadata));
      expect(result[1].name).toEqual(mockEquipmentItems[1].dataValues.name);

      expect(result[2].content).toEqual(mockEquipmentItems[2].dataValues.content);
      expect(result[2].id).toEqual(mockEquipmentItems[2].dataValues.id);
      expect(result[2].image).toEqual(mockEquipmentItems[2].dataValues.image);
      expect(result[2].metadata).toEqual(JSON.parse(mockEquipmentItems[2].dataValues.metadata));
      expect(result[2].name).toEqual(mockEquipmentItems[2].dataValues.name);
    });

    it('should throw when none are found', () => {
      jest.spyOn(EquipmentItem, 'findAll').mockImplementation(() => {
        return new Promise((resolve) => {
          resolve([]);
        });
      });

      expect(async () => {
        await ItemService.getEquipmentItems();
      }).rejects.toThrow(ItemsNotFoundException);
    });
  });

  describe('getMagicItems', () => {
    it('should fetch magic items and format it into an api response', async () => {
      const mockMagicItems = [
        EquipmentItem.build({
          id: '8c1d96db-2b9b-457d-ba59-7d7132ded9bd',
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
        }),
        EquipmentItem.build({
          id: '8c1d96db-2b9b-457d-ba59-7d7132ded9be',
          name: 'Dagger 2',
          image: '/dagger2.png',
          metadata: JSON.stringify([
            {
              name: 'Rarity',
              type: 'string',
              value: 'Common',
            }
          ]),
          content: '# Dagge 2'
        }),
        EquipmentItem.build({
          id: '8c1d96db-2b9b-457d-ba59-7d7132ded9bf',
          name: 'Dagger 3',
          image: '/dagger3.png',
          metadata: JSON.stringify([
            {
              name: 'Rarity',
              type: 'string',
              value: 'Common',
            }
          ]),
          content: '# Dagger 3'
        })
      ];
  
      jest.spyOn(MagicItem, 'findAll').mockImplementation(() => {
        return new Promise((resolve) => {
          resolve(mockMagicItems);
        });
      });
  
      const result: ItemResponse[] = await ItemService.getMagicItems();
  
      expect(result.length).toEqual(3);

      expect(result[0].content).toEqual(mockMagicItems[0].dataValues.content);
      expect(result[0].id).toEqual(mockMagicItems[0].dataValues.id);
      expect(result[0].image).toEqual(mockMagicItems[0].dataValues.image);
      expect(result[0].metadata).toEqual(JSON.parse(mockMagicItems[0].dataValues.metadata));
      expect(result[0].name).toEqual(mockMagicItems[0].dataValues.name);

      expect(result[1].content).toEqual(mockMagicItems[1].dataValues.content);
      expect(result[1].id).toEqual(mockMagicItems[1].dataValues.id);
      expect(result[1].image).toEqual(mockMagicItems[1].dataValues.image);
      expect(result[1].metadata).toEqual(JSON.parse(mockMagicItems[1].dataValues.metadata));
      expect(result[1].name).toEqual(mockMagicItems[1].dataValues.name);

      expect(result[2].content).toEqual(mockMagicItems[2].dataValues.content);
      expect(result[2].id).toEqual(mockMagicItems[2].dataValues.id);
      expect(result[2].image).toEqual(mockMagicItems[2].dataValues.image);
      expect(result[2].metadata).toEqual(JSON.parse(mockMagicItems[2].dataValues.metadata));
      expect(result[2].name).toEqual(mockMagicItems[2].dataValues.name);
    });
  
    it('should throw when none are found', () => {
      jest.spyOn(MagicItem, 'findAll').mockImplementation(() => {
        return new Promise((resolve) => {
          resolve([]);
        });
      });

      expect(async () => {
        await ItemService.getMagicItems();
      }).rejects.toThrow(ItemsNotFoundException);
    });
  });
});