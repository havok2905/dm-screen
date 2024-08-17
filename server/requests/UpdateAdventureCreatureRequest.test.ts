import { AdventureCreatureRequestMalformedException } from '../exceptions';
import { UpdateAdventureCreatureRequest } from './UpdateAdventureCreatureRequest';

describe('UpdateAdventureCreatureRequest', () => {
  describe('constructor', () => {
    it('should construct', () => {
      const subject = new UpdateAdventureCreatureRequest(
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
        const subject = new UpdateAdventureCreatureRequest(
          '1',
          '# Hello',
          '2',
          '/',
          [],
          'name'
        );
  
        subject.validate();
      }).not.toThrow(AdventureCreatureRequestMalformedException);
    });

    it('should not throw an exception for missing data', () => {
      expect(() => {
        const subject = new UpdateAdventureCreatureRequest(
          '',
          '# Hello',
          '',
          '/',
          [],
          ''
        );
  
        subject.validate();
      }).toThrow(AdventureCreatureRequestMalformedException);
    });
  });
});
