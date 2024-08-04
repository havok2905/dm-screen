import {
  Equipment,
  EquipmentItem,
  MagicItem,
  MagicItems,
  Monster,
  Monsters
} from './types';

export interface IDnd5eApiClient {
  getEquipment(): Promise<Equipment>;
  getEquipmentItem(url: string): Promise<EquipmentItem>;
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

  async getEquipment(): Promise<Equipment> {
    return this.makeGetRequest(`${this.base}/api/equipment`);
  }

  async getEquipmentItem(url: string): Promise<EquipmentItem> {
    return this.makeGetRequest(`${this.base}${url}`);
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
