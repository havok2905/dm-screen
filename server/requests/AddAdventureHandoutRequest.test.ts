import { AddAdventureHandoutRequest } from './AddAdventureHandoutRequest';
import { AdventureHandoutRequestMalformedException } from '../exceptions';

describe('AddAdventureHandoutRequest', () => {
  describe('constructor', () => {
    it('should construct', () => {
      const subject = new AddAdventureHandoutRequest(
        '1',
        'name',
        'description',
        '/'
      );

      expect(subject.description).toEqual('description');
      expect(subject.adventureid).toEqual('1');
      expect(subject.name).toEqual('name');
      expect(subject.url).toEqual('/');
    });
  });

  describe('validate', () => {
    it('should not throw an exception with valid data', () => {
      expect(() => {
        const subject = new AddAdventureHandoutRequest(
          '1',
          'name',
          'description',
          '/'
        );
  
        subject.validate();
      }).not.toThrow(AdventureHandoutRequestMalformedException);
    });

    it('should not throw an exception for missing data', () => {
      expect(() => {
        const subject = new AddAdventureHandoutRequest(
          '',
          '',
          '',
          ''
        );
  
        subject.validate();
      }).toThrow(AdventureHandoutRequestMalformedException);
    });
  });
});
