import {
  Ability,
  Action,
  Alignment,
  CR,
  Monster,
  Proficiency,
  Size,
  Skill,
  SuccessType
} from '../types';
import {
  Monster as ApiMonster,
  MonsterAction,
  MonsterProficiencyPartial
} from './types';

export interface IDnd5dApiNormalizer {
  normalize(monsters: ApiMonster[]): Monster[];
}

export class Dnd5dApiNormalizer implements IDnd5dApiNormalizer {
  normalize(monsters: ApiMonster[]): Monster[] {
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
        proficiencyBonus: proficiency_bonus,
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
