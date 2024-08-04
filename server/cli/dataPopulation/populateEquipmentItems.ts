import { Dnd5eDataSeeder } from './Dnd5eDataSeeder';

const populateEquipmentItems = async () => {
  const seeder = new Dnd5eDataSeeder('dnd5eapi');
  await seeder.populateEquipmentItems();
};

populateEquipmentItems();
