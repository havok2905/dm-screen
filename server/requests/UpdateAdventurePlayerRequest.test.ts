import { AdventurePlayerRequestMalformedException } from '../exceptions';
import { UpdateAdventurePlayerRequest } from './UpdateAdventurePlayerRequest';

describe('UpdateAdventureItemRequest', () => {
  describe('constructor', () => {
    it('should construct', () => {
      const subject = new UpdateAdventurePlayerRequest(
        10,
        '1',
        'Character Name',
        '2',
        '/',
        'Player Name'
      );

      expect(subject.ac).toEqual(10);
      expect(subject.adventureid).toEqual('1');
      expect(subject.charactername).toEqual('Character Name');
      expect(subject.id).toEqual('2');
      expect(subject.image).toEqual('/');
      expect(subject.playername).toEqual('Player Name');
    });
  });

  describe('validate', () => {
    it('should not throw an exception with valid data', () => {
      expect(() => {
        const subject = new UpdateAdventurePlayerRequest(
          10,
          '1',
          'Character Name',
          '2',
          '/',
          'Player Name'
        );
  
        subject.validate();
      }).not.toThrow(AdventurePlayerRequestMalformedException);
    });

    it('should not throw an exception for missing data', () => {
      expect(() => {
        const subject = new UpdateAdventurePlayerRequest(
          0,
          '',
          'Character Name',
          '',
          '/',
          'Player Name'
        );
  
        subject.validate();
      }).toThrow(AdventurePlayerRequestMalformedException);
    });
  });
});
