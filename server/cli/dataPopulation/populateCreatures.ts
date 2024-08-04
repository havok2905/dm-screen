import { Dnd5eDataSeeder } from './Dnd5eDataSeeder';

const populateMonsters = async () => {
  const seeder = new Dnd5eDataSeeder('dnd5eapi');
  await seeder.populateMonsters();
};

populateMonsters();
