import fs from 'fs';

import {
  AddImageRequest,
  RemoveImageRequest
} from '../requests';

import { Creature } from '../sequelize/db';
import { ImageResourceNotFoundException } from '../exceptions';
import { ImageService } from './ImageService';

describe('ImageService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addImage', () => {
    it('should fetch a record, set the image type, and upload an image', async () => {

      jest.spyOn(fs, 'unlinkSync').mockImplementation();
      jest.spyOn(fs, 'existsSync').mockImplementation(jest.fn(() => {
        return true;
      }));

      const mockCreature = Creature.build({
        id: '1',
        content: '',
        metadata: '',
        name: 'name',
        image: '/'
      });

      jest.spyOn(Creature, 'findOne').mockImplementation(() => {
        return new Promise((resolve) => {
          resolve(mockCreature);
        });
      });

      jest.spyOn(mockCreature, 'save').mockImplementation(jest.fn());

      const addImageRequest = new AddImageRequest('1', 'creature', '/imagePath');

      const result = await ImageService.addImage(addImageRequest);

      expect(result).toEqual(true);
    });

    it('should throw when none are found', () => {
      jest.spyOn(Creature, 'findOne').mockImplementation(() => {
        return new Promise((resolve) => {
          resolve(null);
        });
      });

      const addImageRequest = new AddImageRequest('1', 'creature', '/imagePath');

      expect(async () => {
        await ImageService.addImage(addImageRequest);
      }).rejects.toThrow(ImageResourceNotFoundException);
    });
  });

  describe('removeImage', () => {
    it('should fetch a record, set the image type, and upload an image', async () => {

      jest.spyOn(fs, 'unlinkSync').mockImplementation();
      jest.spyOn(fs, 'existsSync').mockImplementation(jest.fn(() => {
        return true;
      }));

      const mockCreature = Creature.build({
        id: '1',
        content: '',
        metadata: '',
        name: 'name',
        image: '/'
      });

      jest.spyOn(Creature, 'findOne').mockImplementation(() => {
        return new Promise((resolve) => {
          resolve(mockCreature);
        });
      });

      jest.spyOn(mockCreature, 'save').mockImplementation(jest.fn());

      const removeImageRequest = new RemoveImageRequest('1', 'creature');

      const result = await ImageService.removeImage(removeImageRequest);

      expect(result).toEqual(true);
    });

    it('should throw when none are found', () => {
      jest.spyOn(Creature, 'findOne').mockImplementation(() => {
        return new Promise((resolve) => {
          resolve(null);
        });
      });

      const removeImageRequest = new RemoveImageRequest('1', 'creature');

      expect(async () => {
        await ImageService.removeImage(removeImageRequest);
      }).rejects.toThrow(ImageResourceNotFoundException);
    });
  });
});