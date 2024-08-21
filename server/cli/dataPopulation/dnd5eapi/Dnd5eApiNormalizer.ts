import {
  Ability,
  Action,
  Alignment,
  CR,
  EquipmentItem,
  MagicItem,
  Monster,
  Proficiency,
  Rarity,
  Size,
  Skill,
  SpellItem,
  SuccessType
} from '../types';
import {
  EquipmentItem as ApiEquipmentItem,
  ApiItemBase,
  MagicItem as ApiMagicItem,
  Monster as ApiMonster,
  SpellItem as ApiSpellItem,
  MonsterAction,
  MonsterProficiencyPartial,
} from './types';

export interface IDnd5dApiNormalizer {
  normalizeEquipment(items: ApiEquipmentItem[]): EquipmentItem[];
  normalizeMagicItems(items: ApiMagicItem[]): MagicItem[];
  normalizeMonsters(monsters: ApiMonster[]): Monster[];
  normalizeSpells(spells: ApiSpellItem[]): SpellItem[];
}

export class Dnd5dApiNormalizer implements IDnd5dApiNormalizer {
  normalizeEquipment(items: ApiEquipmentItem[]): EquipmentItem[] {
    const deduped = this.renameDuplicatesFromList(items) as ApiEquipmentItem[];

    return deduped.map(item => {
      const {
        armor_category,
        armor_class,
        capacity,
        category_range,
        contents,
        damage,
        desc,
        equipment_category,
        gear_category,
        name,
        properties,
        range,
        speed,
        str_minimum,
        stealth_disadvantage,
        throw_range,
        two_handed_damage,
        vehicle_category,
        weapon_category,
        weapon_range
      } = item;

      const response: EquipmentItem = {
        armorCategory: armor_category ?? '',
        capacity: capacity ?? '',
        categoryRange: category_range ?? '',
        contents: contents ? contents.map(content => {
          return {
            item: content.item?.name ?? '',
            quantity: content.quantity ?? 0
          }
        }) : [],
        description: this.getDescription(desc ?? []),
        equipmentCategory: equipment_category?.name ?? '',
        gearCategory: gear_category?.name ?? '',
        name: name ?? '',
        properties: properties?.map(p => p?.name ?? '') ?? [],
        range,
        strMinimum: str_minimum ?? 0,
        stealthDisadvantage: stealth_disadvantage ?? false,
        throwRange: throw_range,
        vehicleCategory: vehicle_category ?? '',
        weaponCategory: weapon_category ?? '',
        weaponRange: weapon_range ?? ''
      };

      if (armor_class) {
        response.armorClass = {
          base: armor_class.base ?? 0,
          dexBonus: armor_class.dex_bonus ?? false,
          maxBonus: armor_class.max_bonus ?? 0
        };
      }

      if (damage) {
        const {
          damage_dice,
          damage_type
        } = damage;

        response.damage = {
          damageDice: damage_dice ?? '',
          damageType: damage_type?.name ?? ''
        };
      }

      if (speed) {
        const {
          quantity,
          unit
        } = speed;

        response.speed = {
          quantity: quantity ?? 0,
          unit: unit ?? ''
        };
      }

      if (two_handed_damage) {
        const {
          damage_dice,
          damage_type
        } = two_handed_damage;

        response.twoHandedDamage = {
          damageDice: damage_dice ?? '',
          damageType: damage_type?.name ?? ''
        };
      }

      return response;
    });
  }

  normalizeMagicItems(items: ApiMagicItem[]): MagicItem[] {
    const deduped = this.renameDuplicatesFromList(items) as ApiMagicItem[];

    return deduped.map(item => {
      const {
        desc,
        equipment_category,
        name,
        rarity,
        variant,
        variants
      } = item;

      return {
        category: equipment_category?.name ?? '',
        description: this.getDescription(desc ?? []),
        name: name ?? '',
        rarity: (rarity?.name?.toLocaleLowerCase() ?? '') as Rarity,
        variant: variant ?? false,
        variants: variants?.map(v => v.name ?? '') ?? []
      };
    });
  }

  normalizeMonsters(monsters: ApiMonster[]): Monster[] {
    return monsters.map(monster => {
      const {
        actions,
        alignments,
        armor_class,
        challenge_rating,
        charisma,
        condition_immunities,
        constitution,
        damage_immunities,
        damage_resistances,
        damage_vulnerabilities,
        desc,
        dexterity,
        hit_dice,
        hit_points,
        hit_points_roll,
        intelligence,
        languages,
        legendary_actions,
        name,
        proficiency_bonus,
        proficiencies,
        reactions,
        senses,
        size,
        special_abilities,
        speed,
        strength,
        subtype,
        type,
        wisdom,
        xp        
      } = monster;

      return {
        actions: actions?.map((a) => {
          return this.getAction(a);
        }) ?? [],
        alignments: alignments as Alignment ?? '',
        ac: {
          type: armor_class?.[0]?.type ?? '',
          value: armor_class?.[0]?.value ?? 0
        },
        cr: this.getCr(challenge_rating),
        conditionImmunities: condition_immunities?.map(c => c.name ?? '') ?? [],
        damageImmunities: damage_immunities ?? [],
        damageResistances: damage_resistances ?? [],
        damageVulnerabilities: damage_vulnerabilities ?? [],
        description: desc ?? '',
        features: special_abilities?.map((a) => {
          return this.getAction(a as MonsterAction); // Not technically correct, but this type is just missing damage and we null check for that anyway.
        }) ?? [],
        hitDice: hit_dice ?? '',
        hp: hit_points ?? 0,
        hpRoll: hit_points_roll ?? '',
        languages: languages ?? '',
        legendaryActions: legendary_actions?.map((a) => {
          return this.getAction(a);
        }) ?? [],
        name: name ?? '',
        proficiencies: proficiencies?.map(p => {
          return this.getProficiency(p);
        }) ?? [],
        proficiencyBonus: proficiency_bonus ?? 0,
        reactions: reactions?.map((a) => {
          return this.getAction(a);
        }) ?? [],
        senses: {
          blindsight: senses?.blindsight ?? '',
          darkvision: senses?.darkvision ?? '',
          passivePerception: senses?.passive_perception ?? 0,
          tremorsense: senses?.tremorsense ?? '',
          truesight: senses?.truesight ?? ''
        },
        size: size?.toLocaleLowerCase() as Size ?? '',
        speed: {
          burrow: speed?.burrow ?? '',
          climb: speed?.climb ?? '',
          fly: speed?.fly ?? '',
          swim: speed?.swim ?? '',
          walk: speed?.walk ?? '',
        },
        stats: {
          charisma: charisma ?? 0,
          constitution: constitution ?? 0,
          dexterity: dexterity ?? 0,
          intelligence: intelligence ?? 0,
          strength: strength ?? 0,
          wisdom: wisdom ?? 0
        },
        subtype: subtype ?? '',
        type: type ?? '',
        xp: xp ?? null
      }
    });
  }

  normalizeSpells(spells: ApiSpellItem[]): SpellItem[] {
    return spells.map(spell => {
      const {
        area_of_effect,
        attack_type,
        casting_time,
        classes,
        subclasses,
        components,
        concentration,
        damage,
        dc,
        desc,
        duration,
        higher_level,
        level,
        material,
        name,
        range,
        ritual,
        school 
      } = spell;

      const spellItem: SpellItem = {
        attackType: attack_type ?? '',
        castingTime: casting_time ?? '',
        classes: classes?.map(c => c.name ?? '') ?? [],
        subclasses: subclasses?.map(c => c.name ?? '') ?? [],
        components: components ?? [],
        concentration: concentration ?? false,
        description: this.getDescription(desc ?? []),
        duration: duration ?? '',
        higherLevel: this.getDescription(higher_level ?? []),
        level: level ?? 0,
        material: material ?? '',
        name: name ?? '',
        range: range ?? '',
        ritual: ritual ?? false,
        school: school?.name ?? '',
      };

      if (area_of_effect) {
        spellItem.areaOfEffect = {
          size: area_of_effect?.size ?? 0,
          type: area_of_effect?.type ?? ''
        };
      }

      if (damage) {
        spellItem.damage = {
          damageType: damage?.damage_type?.name ?? '',
          damageAtSlotLevel: {
            '1': damage?.damage_at_slot_level?.[1] ?? '',
            '2': damage?.damage_at_slot_level?.[2] ?? '',
            '3': damage?.damage_at_slot_level?.[3] ?? '',
            '4': damage?.damage_at_slot_level?.[4] ?? '',
            '5': damage?.damage_at_slot_level?.[5] ?? '',
            '6': damage?.damage_at_slot_level?.[6] ?? '',
            '7': damage?.damage_at_slot_level?.[7] ?? '',
            '8': damage?.damage_at_slot_level?.[8] ?? '',
            '9': damage?.damage_at_slot_level?.[9] ?? ''
          }
        };
      }

      if (dc) {
        spellItem.dc = {
          dcType: dc.dc_type?.name as Ability ?? '',
          dcValue: dc.dc_value ?? 0,
          successType: dc.success_type as SuccessType ?? ''
        }
      }

      return spellItem;
    });
  }

  /**
   * There are cases where some sources are distinctly different, yet
   * still share a name. A good example is the dnd5eapi which has
   * the same name for index potion-of-healing ( the description of 
   * all potions of healing ) and potion-of-healing-common ( the
   * standard potion of healing ).
   * 
   * In these cases we want to preserve the data but rename using the
   * index instead.
   */
  private renameDuplicatesFromList(items: ApiItemBase[]): ApiItemBase[] {
    const found: string[] = [];
    const dupe: string[] = [];
    
    return items.map(item => {
      const name = item?.name ?? '';
      const index = item?.index ?? '';
      let itemToReturn: ApiMagicItem;

      if (found.includes(name) && !dupe.includes(name)) {
        dupe.push(name);
        itemToReturn = {
          ...item,
          name: index.replace('-', ' ').replace(/([A-Z])/g, ' $1').trim()
        };
      } else {
        itemToReturn = item;
      }

      if (!found.includes(name)) {
        found.push(name);
      }

      return itemToReturn;
    })
  }

  /**
   * The dnd5eapi gives us these descriptions as arrays of
   * strings, with each line being a line of markdown. But,
   * certain lines need spaces, while others don't, such as
   * with tables. 
   */
  getDescription(descriptionLines: string[]) {
    const linesWithSpaces: string[] = [];

    descriptionLines.forEach(line => {
      linesWithSpaces.push(line);

      const tableElementRegex = /^((\|[^|\r\n]*)+\|(\r?\n|\r)?)+/gm;
      const notMatch = tableElementRegex.exec(line);

      if (!notMatch) {
        linesWithSpaces.push('\n');
        linesWithSpaces.push('\n');
      } else {
        linesWithSpaces.push('\n');
      }
    });

    return linesWithSpaces.join('');
  }

  private getAbilityFromSkill(skill: string): Ability {
    switch(skill) {
      case 'athletics':
        return 'strength';
      case 'acrobatics':
      case 'sleight of hand':
      case 'stealth':
        return 'dexterity';
      case 'arcana':
      case 'history':
      case 'investigation':
      case 'nature':
      case 'religion':
        return 'intelligence';
      case 'animal handling':
      case 'insight':
      case 'medicine':
      case 'perception':
      case 'survival':
        return 'wisdom';
      case 'deception':
      case 'intimidation':
      case 'performance':
      case 'persuasion':
        return 'charisma';
      default:
        return ''; 
    }
  }

  private getProficiency(p: MonsterProficiencyPartial): Proficiency {
    return {
      ability: this.getAbilityFromSkill(p.proficiency?.name ?? ''),
      skill: p.proficiency?.name as Skill ?? '',
      value: p.value ?? 0
    }
  }

  private getAction(ma: MonsterAction): Action {
    const {
      damage,
      dc,
      desc,
      multiattack_type,
      name
    } = ma;

    return {
      damage: damage?.map(d => {
        const {
          damage_dice,
          damage_type
        } = d;

        return {
          damageDice: damage_dice ?? '',
          damageType: damage_type?.name ?? ''
        };
      }) ?? [],
      dc: dc ? {
        dcType: dc.dc_type?.name as Ability ?? '',
        dcValue: dc.dc_value ?? 0,
        successType: dc.success_type as SuccessType ?? ''
      } : null,
      description: desc ?? '',
      multiattackType: multiattack_type ?? '',
      name: name ?? ''
    }
  }

  private getCr(number): CR {
    if (!number) return '0';
    if (number === 0.125) return '1/8';
    if (number === 0.25) return '1/4';
    if (number === 0.5) return '1/2';
    if (number >= 1) return String(number) as CR;
    return '0' // We got some unknown number back that does not match CR
  }
}
