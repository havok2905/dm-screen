import { IDnd5eApiClient } from './Dnd5eApiClient';
import { Monster } from './types';

export interface IDnd5eApiService {
  getMonsters(): Promise<Monster[]>;
}

export class Dnd5eApiService implements IDnd5eApiService {
  private dnd5eApiClient: IDnd5eApiClient;

  constructor(dnd5eApiClient: IDnd5eApiClient) {
    this.dnd5eApiClient = dnd5eApiClient;
  }

  async getMonsters(): Promise<Monster[]> {
    const monstersResponse = await this.dnd5eApiClient.getMonsters();
    const monstersResult = monstersResponse.results;

    const monsters: Monster[] = [];

    for(let x=0; x<monstersResult.length; x++) {
      const monstersItem = monstersResult[x];
      const monsterResponse = await this.dnd5eApiClient.getMonster(monstersItem.url ?? '');
      monsters.push(monsterResponse);
    }

    return monsters;
  }
}