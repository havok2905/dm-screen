import { ImageRequestMalformedException } from '../exceptions';
import { RemoveImageRequest } from './RemoveImageRequest';

describe('RemoveAdventureHandoutRequest', () => {
  describe('constructor', () => {
    it('should construct', () => {
      const subject = new RemoveImageRequest(
        '1',
        'creature'
      );

      expect(subject.entityId).toEqual('1');
      expect(subject.entityType).toEqual('creature');
    });
  });

  describe('validate', () => {
    it('should not throw an exception with valid data', () => {
      expect(() => {
        const subject = new RemoveImageRequest(
          '1',
          'creature'
        );
  
        subject.validate();
      }).not.toThrow(ImageRequestMalformedException);
    });

    it('should throw an exception for missing data', () => {
      expect(() => {
        const subject = new RemoveImageRequest(
          '',
          // @ts-expect-error this is explicitly testing wrong data populating from the request body
          ''
        );
  
        subject.validate();
      }).toThrow(ImageRequestMalformedException);
    });
  });
});
