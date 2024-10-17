import {
  CreateSpellRequest,
  UpdateSpellRequest
} from '../requests';
import {
  MissingArgumentException,
  SpellNotFoundException,
  SpellsNotFoundException
} from '../exceptions';

import { deleteImageFromDiskIfItExists } from './utils/deleteImageFromDiskIfItExists';
import { Spell } from '../sequelize/db';
import { SpellResponse } from '../responses';

export class SpellService {
  static async createSpell(
    createSpellRequest: CreateSpellRequest
  ): Promise<SpellResponse> {
    if (!createSpellRequest) {
      throw new MissingArgumentException();
    }

    createSpellRequest.validate();

    const spell = await Spell.create({
      content: createSpellRequest.content,
      id: createSpellRequest.id,
      image: createSpellRequest.image,
      metadata: JSON.stringify(createSpellRequest.metadata),
      name: createSpellRequest.name
    });

    return this.mapSpellResponseJson(spell);
  }

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

    deleteImageFromDiskIfItExists(spell.dataValues.image);

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