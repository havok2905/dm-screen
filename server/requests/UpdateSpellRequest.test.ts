import { SpellRequestMalformedException } from '../exceptions';
import { UpdateSpellRequest } from './UpdateSpellRequest';

describe('UpdateSpellRequest', () => {
  describe('constructor', () => {
    it('should construct', () => {
      const subject = new UpdateSpellRequest(
        '# Hello',
        '2',
        '/',
        [],
        'name'
      );

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
        const subject = new UpdateSpellRequest(
          '# Hello',
          '2',
          '/',
          [],
          'name'
        );
  
        subject.validate();
      }).not.toThrow(SpellRequestMalformedException);
    });

    it('should not throw an exception for missing data', () => {
      expect(() => {
        const subject = new UpdateSpellRequest(
          '# Hello',
          '',
          '/',
          [],
          ''
        );
  
        subject.validate();
      }).toThrow(SpellRequestMalformedException);
    });
  });
});
