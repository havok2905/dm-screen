import { v4 as uuidv4 } from 'uuid';

import {
  Dnd5eApiAdapter,
  Dnd5eApiClient,
  Dnd5dApiNormalizer
} from '../dataPopulation/dnd5eapi';
import {
  IThirdPartyDndAdapter,
  Monster,
  SourceKinds
} from './types';

import { MonsterTemplate } from './templates';

import { Creature } from '../../sequelize/db';

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
      return this.getMarkdownEntity(monster, monsterMarkdown);
    }).map(monster => {
      return {
        ...monster,
        metadata: JSON.stringify(monster.metadata)
      };
    });

    Creature.bulkCreate(markdownEntities, { validate: true });

    console.log('End: populateDndMonsters');
  }

  private getMarkdownEntity(monster: Monster, monsterMarkdown: string): MarkdownEntity {
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
