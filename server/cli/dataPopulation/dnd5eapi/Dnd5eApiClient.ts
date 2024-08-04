import {
  MagicItem,
  MagicItems,
  Monster,
  Monsters
} from './types';

export interface IDnd5eApiClient {
  getMagicItem(url: string): Promise<MagicItem>;
  getMagicItems(): Promise<MagicItems>;
  getMonster(url: string): Promise<Monster>;
  getMonsters(): Promise<Monsters>;
}

export class Dnd5eApiClient implements IDnd5eApiClient {
  private base: string;

  constructor() {
    this.base = 'https://www.dnd5eapi.co';
  }

  async getMagicItem(url: string): Promise<MagicItem> {
    return this.makeGetRequest(`${this.base}${url}`);
  }

  async getMagicItems(): Promise<MagicItems> {
    return this.makeGetRequest(`${this.base}/api/magic-items`);
  }

  async getMonster(url: string): Promise<Monster> {
    return this.makeGetRequest(`${this.base}${url}`);
  }

  async getMonsters(): Promise<Monsters> {
    return this.makeGetRequest(`${this.base}/api/monsters`);
  }

  private async makeGetRequest(url: string) {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    });

    return response.json();
  }
}
