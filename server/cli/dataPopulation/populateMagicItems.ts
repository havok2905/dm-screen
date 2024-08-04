import { Dnd5eDataSeeder } from './Dnd5eDataSeeder';

const populateMagicItems = async () => {
  const seeder = new Dnd5eDataSeeder('dnd5eapi');
  await seeder.populateMagicItems();
};

populateMagicItems();
