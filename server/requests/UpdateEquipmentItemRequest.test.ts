import { EquipmentItemRequestMalformedException } from '../exceptions';
import { UpdateEquipmentItemRequest } from './UpdateEquipmentItemRequest';

describe('UpdateEquipmentItemRequest', () => {
  describe('constructor', () => {
    it('should construct', () => {
      const subject = new UpdateEquipmentItemRequest(
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
        const subject = new UpdateEquipmentItemRequest(
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
        const subject = new UpdateEquipmentItemRequest(
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
