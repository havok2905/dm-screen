
import {
  EquipmentItem,
  MagicItem
} from '../sequelize/db';
import {
  EquipmentItemNotFoundException,
  ItemsNotFoundException,
  MagicItemNotFoundException,
  MissingArgumentException
} from '../exceptions';
import {
  UpdateEquipmentItemRequest,
  UpdateMagicItemRequest
} from '../requests';

import { ItemResponse } from '../responses';
import { ItemService } from './ItemService';

describe('ItemService', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  describe('destroyEquipmentItemById', () => {
    it('should destroy an equipment item', async () => {
      const mockItem = EquipmentItem.build({
        id: '1',
        name: 'Foo',
        content: 'content A',
      });

      jest.spyOn(EquipmentItem, 'findOne').mockImplementation(() => {
        return new Promise((resolve) => {
          resolve(mockItem);
        });
      });

      jest.spyOn(mockItem, 'destroy').mockImplementation(jest.fn());
      jest.spyOn(mockItem, 'save').mockImplementation(jest.fn());

      const result = await ItemService.destroyEquipmentItemById('1');

      expect(result).toEqual(true);
    });

    it('should throw when none are found', () => {
      jest.spyOn(EquipmentItem, 'findOne').mockImplementation(() => {
        return new Promise((resolve) => {
          resolve(null);
        });
      });

      expect(async () => {
        await ItemService.destroyEquipmentItemById('1');
      }).rejects.toThrow(EquipmentItemNotFoundException);
    });

    it('should throw for bad arguments', () => {
      expect(async () => {
        await ItemService.destroyEquipmentItemById('');
      }).rejects.toThrow(MissingArgumentException);
    });
  });

  describe('destroyMagicItemById', () => {
    it('should destroy an magic item', async () => {
      const mockItem = MagicItem.build({
        id: '1',
        name: 'Foo',
        content: 'content A',
      });

      jest.spyOn(MagicItem, 'findOne').mockImplementation(() => {
        return new Promise((resolve) => {
          resolve(mockItem);
        });
      });

      jest.spyOn(mockItem, 'destroy').mockImplementation(jest.fn());
      jest.spyOn(mockItem, 'save').mockImplementation(jest.fn());

      const result = await ItemService.destroyMagicItemById('1');

      expect(result).toEqual(true);
    });

    it('should throw when none are found', () => {
      jest.spyOn(MagicItem, 'findOne').mockImplementation(() => {
        return new Promise((resolve) => {
          resolve(null);
        });
      });

      expect(async () => {
        await ItemService.destroyMagicItemById('1');
      }).rejects.toThrow(MagicItemNotFoundException);
    });

    it('should throw for bad arguments', () => {
      expect(async () => {
        await ItemService.destroyMagicItemById('');
      }).rejects.toThrow(MissingArgumentException);
    });
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

  describe('updateEquipmentItemById', () => {
    it('should update an item', async () => {
      const mockItem = EquipmentItem.build({
        content: '# Hello',
        id: '1',
        image: '/',
        metadata: [],
        name: 'Foo Adventure',
      });

      jest.spyOn(EquipmentItem, 'findOne').mockImplementation(() => {
        return new Promise((resolve) => {
          resolve(mockItem);
        });
      });

      jest.spyOn(mockItem, 'update').mockImplementation((newData) => {
        mockItem.setDataValue('content', newData.content);
        mockItem.setDataValue('image', newData.image);
        mockItem.setDataValue('metadata', newData.metadata);
        mockItem.setDataValue('name', newData.name);

        return new Promise<void>((resolve) => {
          resolve();
        });
      });

      const response = await ItemService.updateEquipmentItemById(
        '1',
        new UpdateEquipmentItemRequest(
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
      jest.spyOn(EquipmentItem, 'findOne').mockImplementation(() => {
        return new Promise((resolve) => {
          resolve(null);
        });
      });

      expect(async () => {
        await ItemService.updateEquipmentItemById('1', new UpdateEquipmentItemRequest(
          '# Hello',
          '1',
          '/',
          [],
          'Name'
        ));
      }).rejects.toThrow(EquipmentItemNotFoundException);
    });

    it('should throw for bad arguments', () => {
      expect(async () => {
        await ItemService.updateEquipmentItemById('', new UpdateEquipmentItemRequest(
          '# Hello',
          '',
          '/',
          [],
          ''
        ));
      }).rejects.toThrow(MissingArgumentException);
    });
  });

  describe('updateMagicItemById', () => {
    it('should update an item', async () => {
      const mockItem = MagicItem.build({
        content: '# Hello',
        id: '1',
        image: '/',
        metadata: [],
        name: 'Foo Adventure',
      });

      jest.spyOn(MagicItem, 'findOne').mockImplementation(() => {
        return new Promise((resolve) => {
          resolve(mockItem);
        });
      });

      jest.spyOn(mockItem, 'update').mockImplementation((newData) => {
        mockItem.setDataValue('content', newData.content);
        mockItem.setDataValue('image', newData.image);
        mockItem.setDataValue('metadata', newData.metadata);
        mockItem.setDataValue('name', newData.name);

        return new Promise<void>((resolve) => {
          resolve();
        });
      });

      const response = await ItemService.updateMagicItemById(
        '1',
        new UpdateMagicItemRequest(
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
      jest.spyOn(MagicItem, 'findOne').mockImplementation(() => {
        return new Promise((resolve) => {
          resolve(null);
        });
      });

      expect(async () => {
        await ItemService.updateMagicItemById('1', new UpdateMagicItemRequest(
          '# Hello',
          '1',
          '/',
          [],
          'Name'
        ));
      }).rejects.toThrow(MagicItemNotFoundException);
    });

    it('should throw for bad arguments', () => {
      expect(async () => {
        await ItemService.updateMagicItemById('', new UpdateMagicItemRequest(
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