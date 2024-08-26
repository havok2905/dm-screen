import { Dnd5eDataSeeder } from '../cli/dataPopulation/Dnd5eDataSeeder';

export class ImportService {
  static async initiate5eApiImport(io): Promise<boolean> {
    const seeder = new Dnd5eDataSeeder('dnd5eapi');

    try {
      io.emit('importing:equipment-items-initiated');
      await seeder.populateEquipmentItems();
      io.emit('importing:equipment-items-completed');

      io.emit('importing:magic-items-initiated');
      await seeder.populateMagicItems();
      io.emit('importing:magic-items-completed');
      
      io.emit('importing:creatures-initiated');
      await seeder.populateMonsters();
      io.emit('importing:creatures-completed');

      io.emit('importing:spells-initiated');
      await seeder.populateSpells();
      io.emit('importing:spells-completed');

      return true;
    } catch (e) {
      return false;
    }
  }
}