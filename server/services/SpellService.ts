import {
  MissingArgumentException,
  SpellNotFoundException,
  SpellsNotFoundException
} from '../exceptions';

import { Spell } from '../sequelize/db';
import { SpellResponse } from '../responses';
import { UpdateSpellRequest } from '../requests';

export class SpellService {
  static async destroySpellById(id: string): Promise<boolean> {
    if (!id) {
      throw new MissingArgumentException();
    }

    const spell = await Spell.findOne({
      where: {
        id
      }
    });

    if (!spell) {
      throw new SpellNotFoundException();
    }

    spell?.destroy();
    spell?.save();
  
    return true;
  }

  static async getSpells(): Promise<SpellResponse[]> {
    const spells = await Spell.findAll({
      order: [
        [
          'name',
          'ASC'
        ]
      ]
    });

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

  static async updateSpellById(id: string, updateSpellRequest: UpdateSpellRequest): Promise<SpellResponse> {
    if (!id || !updateSpellRequest) {
      throw new MissingArgumentException();
    }

    updateSpellRequest.validate();

    const spell = await Spell.findOne({
      where: {
        id: id
      }
    });

    if (!spell) {
      throw new SpellNotFoundException();
    }

    await spell.update({
      content: updateSpellRequest.content,
      image: updateSpellRequest.image,
      metadata: JSON.stringify(updateSpellRequest.metadata),
      name: updateSpellRequest.name
    });

    return this.mapSpellResponseJson(spell);
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