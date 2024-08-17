import { AdventureItemRequestMalformedException } from '../exceptions';
import { UpdateAdventureItemRequest } from './UpdateAdventureItemRequest';

describe('UpdateAdventureItemRequest', () => {
  describe('constructor', () => {
    it('should construct', () => {
      const subject = new UpdateAdventureItemRequest(
        '1',
        '# Hello',
        '2',
        '/',
        [],
        'name'
      );

      expect(subject.adventureid).toEqual('1');
      expect(subject.content).toEqual('# Hello');
      expect(subject.id).toEqual('2');
      expect(subject.image).toEqual('/');
      expect(subject.metadata).toEqual([]);
      expect(subject.name).toEqual('name');
    });
  });

  describe('validate', () => {
    it('should not throw an exception with valid data', () => {
      expect(() => {
        const subject = new UpdateAdventureItemRequest(
          '1',
          '# Hello',
          '2',
          '/',
          [],
          'name'
        );
  
        subject.validate();
      }).not.toThrow(AdventureItemRequestMalformedException);
    });

    it('should not throw an exception for missing data', () => {
      expect(() => {
        const subject = new UpdateAdventureItemRequest(
          '',
          '# Hello',
          '',
          '/',
          [],
          ''
        );
  
        subject.validate();
      }).toThrow(AdventureItemRequestMalformedException);
    });
  });
});
