import { Dnd5eDataSeeder } from './Dnd5eDataSeeder';

const populate = async () => {
  const seeder = new Dnd5eDataSeeder('dnd5eapi');

  await seeder.populateEquipmentItems();
  await seeder.populateMagicItems();
  await seeder.populateMonsters();
  await seeder.populateSpells();
};

populate();
