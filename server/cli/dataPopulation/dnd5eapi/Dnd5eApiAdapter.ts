import { IDnd5eApiClient } from './Dnd5eApiClient';
import { IDnd5dApiNormalizer } from './Dnd5eApiNormalizer';
import { IThirdPartyDndAdapter, Monster } from '../types';
import { Monster as ApiMonster } from './types';

export class Dnd5eApiAdapter implements IThirdPartyDndAdapter {
  private dnd5eApiClient: IDnd5eApiClient;
  private dnd5dApiNormalizer: IDnd5dApiNormalizer;

  constructor(
    dnd5eApiClient: IDnd5eApiClient,
    dnd5dApiNormalizer: IDnd5dApiNormalizer
  ) {
    this.dnd5eApiClient = dnd5eApiClient;
    this.dnd5dApiNormalizer = dnd5dApiNormalizer;
  }

  async getMonsters(): Promise<Monster[]> {
    const monstersResponse = await this.dnd5eApiClient.getMonsters();
    const monstersResult = monstersResponse.results;

    const monsters: ApiMonster[] = [];

    for(let x=0; x<monstersResult.length; x++) {
      const monstersItem = monstersResult[x];
      const monsterResponse = await this.dnd5eApiClient.getMonster(monstersItem.url ?? '');
      monsters.push(monsterResponse);
    }

    const response = this.dnd5dApiNormalizer.normalize(monsters);

    return response;
  }
}