import { v4 as uuidv4 } from 'uuid';

import {
  Creature,
  EquipmentItem as EquipmentItemModel,
  MagicItem as MagicItemModel
} from '../../sequelize/db';
import {
  Dnd5eApiAdapter,
  Dnd5eApiClient,
  Dnd5dApiNormalizer
} from '../dataPopulation/dnd5eapi';
import {
  EquipmentItem,
  IThirdPartyDndAdapter,
  MagicItem,
  Monster,
  SourceKinds
} from './types';
import {
  EquipmentItemTemplate,
  MagicItemTemplate,
  MonsterTemplate
} from './templates';

// This should likely be moved up a level. There is a need to start sharing types between client and server
import {
  MarkdownEntity,
  MetaData
} from '../../../src/core/types';

export class Dnd5eDataSeeder {
  private adapter: IThirdPartyDndAdapter;
  private source: SourceKinds;

  constructor(source: SourceKinds) {
    this.source = source;
    this.init();
  }

  async populateEquipmentItems(): Promise<void> {
    console.log('Starting: populateDndEquipmentItems. This may take a while');

    const interval = setInterval(() => {
      console.log('Fetching: populateDndEquipmentItems');
    }, 1500);

    const items = await this.adapter.getEquipmentItems();

    clearInterval(interval);

    const markdownEntities = items.map(item => {
      const equipmentItemTemplate = new EquipmentItemTemplate(item);
      const equipmentItemMarkdown = equipmentItemTemplate.render();
      return this.getEquipmentItemMarkdownEntity(item, equipmentItemMarkdown);
    }).map(item => {
      return {
        ...item,
        metadata: JSON.stringify(item.metadata)
      };
    });

    EquipmentItemModel.bulkCreate(markdownEntities, { validate: true });

    console.log('End: populateDndEquipmentItems');
  }

  async populateMagicItems(): Promise<void> {
    console.log('Starting: populateDndMagicItems. This may take a while');

    const interval = setInterval(() => {
      console.log('Fetching: populateDndMagicItems');
    }, 1500);

    const magicItems = await this.adapter.getMagicItems();

    clearInterval(interval);

    const markdownEntities = magicItems.map(magicItem => {
      const magicItemTemplate = new MagicItemTemplate(magicItem);
      const magicItemMarkdown = magicItemTemplate.render();
      return this.getMagicItemMarkdownEntity(magicItem, magicItemMarkdown);
    }).map(magicItem => {
      return {
        ...magicItem,
        metadata: JSON.stringify(magicItem.metadata)
      };
    });

    MagicItemModel.bulkCreate(markdownEntities, { validate: true });

    console.log('End: populateDndMagicItems');
  }

  async populateMonsters(): Promise<void> {
    console.log('Starting: populateDndMonsters. This may take a while');

    const interval = setInterval(() => {
      console.log('Fetching: populateDndMonsters');
    }, 1500);

    const monsters = await this.adapter.getMonsters();

    clearInterval(interval);

    const markdownEntities = monsters.map(monster => {
      const monsterTemplate = new MonsterTemplate(monster);
      const monsterMarkdown = monsterTemplate.render();
      return this.getMonsterMarkdownEntity(monster, monsterMarkdown);
    }).map(monster => {
      return {
        ...monster,
        metadata: JSON.stringify(monster.metadata)
      };
    });

    Creature.bulkCreate(markdownEntities, { validate: true });

    console.log('End: populateDndMonsters');
  }

  private getEquipmentItemMarkdownEntity(item: EquipmentItem, itemMarkdown: string): MarkdownEntity {
    const metadata: MetaData[] = [
      {
        name: 'Equipment Category',
        type: 'string',
        value: item.equipmentCategory
      }
    ];

    if (item.armorCategory) {
      metadata.push({
        name: 'Armor Category',
        type: 'string',
        value: item.armorCategory
      });
    }

    if (item.gearCategory) {
      metadata.push({
        name: 'Gear Category',
        type: 'string',
        value: item.gearCategory
      });
    }

    if (item.vehicleCategory) {
      metadata.push({
        name: 'Vehicle Category',
        type: 'string',
        value: item.vehicleCategory
      });
    }

    if (item.weaponCategory) {
      metadata.push({
        name: 'Weapon Category',
        type: 'string',
        value: item.weaponCategory
      });
    }

    if (item.weaponRange) {
      metadata.push({
        name: 'Weapon Range',
        type: 'string',
        value: item.weaponRange
      });
    }
    
    return {
      content: itemMarkdown,
      id: uuidv4(),
      name: item.name,
      metadata
    };
  }

  private getMagicItemMarkdownEntity(magicItem: MagicItem, magicItemMarkdown: string): MarkdownEntity {
    return {
      content: magicItemMarkdown,
      id: uuidv4(),
      name: magicItem.name,
      metadata: [
        {
          name: 'Category',
          type: 'string',
          value: magicItem.category
        },
        {
          name: 'Rarity',
          type: 'number',
          value: magicItem.rarity
        }
      ]
    };
  }

  private getMonsterMarkdownEntity(monster: Monster, monsterMarkdown: string): MarkdownEntity {
    return {
      content: monsterMarkdown,
      id: uuidv4(),
      name: monster.name,
      metadata: [
        {
          name: 'Type',
          type: 'string',
          value: monster.type
        },
        {
          name: 'AC',
          type: 'number',
          value: monster.ac.value
        },
        {
          name: 'HP',
          type: 'number',
          value: monster.hp
        },
        {
          name: 'CR',
          type: 'string',
          value: monster.cr
        }
      ]
    };
  }

  private init() {
    switch(this.source) {
      case 'dnd5eapi':
        const apiClient = new Dnd5eApiClient();
        const normalizer = new Dnd5dApiNormalizer();
        this.adapter = new Dnd5eApiAdapter(apiClient, normalizer);
        break;
      default:
        console.error('kind is unknown');
        return;
    }
  }
}
