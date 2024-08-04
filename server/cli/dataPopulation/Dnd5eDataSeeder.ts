import { v4 as uuidv4 } from 'uuid';

import {
  Creature,
  MagicItem as MagicItemModel
} from '../../sequelize/db';
import {
  Dnd5eApiAdapter,
  Dnd5eApiClient,
  Dnd5dApiNormalizer
} from '../dataPopulation/dnd5eapi';
import {
  IThirdPartyDndAdapter,
  MagicItem,
  Monster,
  SourceKinds
} from './types';
import {
  MagicItemTemplate,
  MonsterTemplate
} from './templates';

// This should likely be moved up a level. There is a need to start sharing types between client and server
import {
  MarkdownEntity
} from '../../../src/core/types';

export class Dnd5eDataSeeder {
  private adapter: IThirdPartyDndAdapter;
  private source: SourceKinds;

  constructor(source: SourceKinds) {
    this.source = source;
    this.init();
  }

  async populateMagicItems(): Promise<void> {
    console.log('Starting: populateDndMagicItems. This may take a while');

    const interval = setInterval(() => {
      console.log('Fetching: populateDndMagicItems');
    }, 1500);

    const magicItems = await this.adapter.getMagicItems();

    console.log('Fetched and now clearing: populateDndMagicItems');

    clearInterval(interval);

    console.log('cleared: populateDndMagicItems');
    console.log('normalizing: populateDndMagicItems');

    const markdownEntities = magicItems.map(magicItem => {
      const monsterTemplate = new MagicItemTemplate(magicItem);
      const monsterMarkdown = monsterTemplate.render();
      return this.getMagicItemMarkdownEntity(magicItem, monsterMarkdown);
    }).map(magicItem => {
      return {
        ...magicItem,
        metadata: JSON.stringify(magicItem.metadata)
      };
    });

    console.log('normalized and creating: populateDndMagicItems');

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
