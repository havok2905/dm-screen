import {
  Dnd5eApiClient,
  Dnd5eApiService
} from './dataPopulation/dnd5eapi';

type PopulationMethod = 'dnd5eapi';

export const populateDndMonsters = async (populationMethod: PopulationMethod) => {

  if (populationMethod === 'dnd5eapi') {
    const dndSrd5eApiClient = new Dnd5eApiClient();
    const dnd5eApiService = new Dnd5eApiService(dndSrd5eApiClient);
    const monsters = await dnd5eApiService.getMonsters();
    return monsters;
  }
};