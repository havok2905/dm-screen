import {AdventureRequestMalformedException} from '../exceptions';
import { CreateAdventureRequest } from './CreateAdventureRequest';

describe('CreateAdventureRequest', () => {
  describe('constructor', () => {
    it('should construct', () => {
      const subject = new CreateAdventureRequest(
        'my description',
        '1',
        'my name',
        'dnd'
      );

      expect(subject.description).toEqual('my description');
      expect(subject.id).toEqual('1');
      expect(subject.name).toEqual('my name');
      expect(subject.system).toEqual('dnd');
    });
  });

  describe('validate', () => {
    it('should not throw an exception with valid data', () => {
      expect(() => {
        const subject = new CreateAdventureRequest(
          'my description',
          '1',
          'my name',
          'dnd'
        );
  
        subject.validate();
      }).not.toThrow(AdventureRequestMalformedException);
    });

    it('should not throw an exception for missing data', () => {
      expect(() => {
        const subject = new CreateAdventureRequest(
          '',
          '',
          '',
          ''
        );
  
        subject.validate();
      }).toThrow(AdventureRequestMalformedException);
    });
  });
});
