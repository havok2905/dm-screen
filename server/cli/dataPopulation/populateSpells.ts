import { Dnd5eDataSeeder } from './Dnd5eDataSeeder';

const populateSpells = async () => {
  const seeder = new Dnd5eDataSeeder('dnd5eapi');
  await seeder.populateSpells();
};

populateSpells();
