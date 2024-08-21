import {
  MissingArgumentException,
  SpellNotFoundException,
  SpellsNotFoundException
} from '../exceptions';

import { Spell } from '../sequelize/db';
import { SpellResponse } from '../responses';

export class SpellService {
  static async getSpells(): Promise<SpellResponse[]> {
    const spells = await Spell.findAll();

    if (!spells.length) {
      throw new SpellsNotFoundException();    
    }

    return this.mapResponseJson(spells);
  }

  static async getSpellById(id: string): Promise<SpellResponse> {
    if (!id) {
      throw new MissingArgumentException();
    }

    const spell = await Spell.findOne({
      where: {
        id: id
      }
    });

    if (!spell) {
      throw new SpellNotFoundException();
    }

    return this.mapSpellResponseJson(
      spell
    );
  }

  private static mapSpellResponseJson (
    spell
  ): SpellResponse {
    return {
      ...spell.dataValues,
      metadata: JSON.parse(spell.dataValues.metadata)
    };
  }

  private static mapResponseJson (
    spells
  ): SpellResponse[] {
    return spells.map(spell => {
      return {
        ...spell.dataValues,
        metadata: JSON.parse(spell.dataValues.metadata)
      };
    });
  }
}