import { InitiativeRequestMalformedException } from '../exceptions';
import { UpdateInitiativeRequest } from './UpdateInitiativeRequest';

describe('UpdateInitiativeRequest', () => {
  describe('constructor', () => {
    it('should construct', () => {
      const subject = new UpdateInitiativeRequest('{"foo": "bar"}');

      expect(subject.initiativeOrderState).toEqual('{"foo": "bar"}');
    });
  });

  describe('validate', () => {
    it('should not throw an exception with valid data', () => {
      expect(() => {
        const subject = new UpdateInitiativeRequest('{"foo": "bar"}');
        subject.validate();
      }).not.toThrow(InitiativeRequestMalformedException);
    });

    it('should throw an exception for missing data', () => {
      expect(() => {
        const subject = new UpdateInitiativeRequest('');
  
        subject.validate();
      }).toThrow(InitiativeRequestMalformedException);
    });

    it('should throw an exception for bad typed data', () => {
      expect(() => {
        const subject = new UpdateInitiativeRequest(0);
  
        subject.validate();
      }).toThrow(InitiativeRequestMalformedException);
    });

    it('should throw an exception for malformed json data', () => {
      expect(() => {
        const subject = new UpdateInitiativeRequest('foooooooo: 8');
  
        subject.validate();
      }).toThrow(InitiativeRequestMalformedException);
    });
  });
});
