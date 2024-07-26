import { AdventureRequestMalformedException } from '../exceptions';
import { UpdateAdventureRequest } from './UpdateAdventureRequest';

describe('CreateAdventureRequest', () => {
  describe('constructor', () => {
    it('should construct', () => {
      const subject = new UpdateAdventureRequest(
        'my description',
        'my name',
        'fooooooooooooooooooo',
        'dnd'
      );

      expect(subject.description).toEqual('my description');
      expect(subject.name).toEqual('my name');
      expect(subject.notes).toEqual('fooooooooooooooooooo');
      expect(subject.system).toEqual('dnd');
    });
  });

  describe('validate', () => {
    it('should not throw an exception with valid data', () => {
      expect(() => {
        const subject = new UpdateAdventureRequest(
          'my description',
          'my name',
          'fooooooooooooooooooo',
          'dnd'
        );
  
        subject.validate();
      }).not.toThrow(AdventureRequestMalformedException);
    });

    it('should not throw an exception for missing data', () => {
      expect(() => {
        const subject = new UpdateAdventureRequest(
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
