import { CreateEquipmentItemRequest } from './CreateEquipmentItemRequest';
import { EquipmentItemRequestMalformedException } from '../exceptions';

describe('CreateEquipmentItemRequest', () => {
  describe('constructor', () => {
    it('should construct', () => {
      const subject = new CreateEquipmentItemRequest(
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
        const subject = new CreateEquipmentItemRequest(
          '# Hello',
          '2',
          '/',
          [],
          'name'
        );
  
        subject.validate();
      }).not.toThrow(EquipmentItemRequestMalformedException);
    });

    it('should not throw an exception for missing data', () => {
      expect(() => {
        const subject = new CreateEquipmentItemRequest(
          '# Hello',
          '',
          '/',
          [],
          ''
        );
  
        subject.validate();
      }).toThrow(EquipmentItemRequestMalformedException);
    });
  });
});
