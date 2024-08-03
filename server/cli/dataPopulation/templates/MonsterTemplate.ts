import { Action, Monster } from '../types';

export class MonsterTemplate {
  private monster: Monster;

  constructor(monster: Monster) {
    this.monster = monster;
  }

  render(): string {
return `# ${this.monster.name}

*${this.monster.size} ${this.monster.type}, ${this.monster.alignments}*

**Armor Class** ${this.monster.ac.value}${this.monster.ac.type ? ` ( ${this.monster.ac.type} )` : ''}

**Hit Points** ${this.monster.hp}${this.monster.hpRoll ? ` ${this.monster.hpRoll}` : ''}

${this.getSpeed()}

**XP** ${this.monster.xp}

${this.getStatBlock()}

${this.getSkills()}

${this.getSaves()}

${this.getSenses()}

${this.getConditionImmunities()}

${this.getDamageImmunities()}

${this.getDamageResistances()}

${this.getDamageVulnerabilities()}

**Languages** ${this.monster.languages || '--'}

**Challenge** ${this.monster.cr}

**Proficiency Bonus** ${this.monster.proficiencyBonus}

${this.getActions('Features', this.monster.features)}

${this.getActions('Actions', this.monster.actions)}

${this.getActions('Legendary Actions', this.monster.legendaryActions)}
`;
  }

  private getActions(title: string, items: Action[]): string {
    if (!items.length) return '';

    const actions = items.map(action => {
      return this.getAction(action);
    }).join();

    return `
---

## ${title}

${actions}
`;
  }

  private getAction(action: Action): string {
    if (!action) return '';

    return `

**${action.name}.** ${action.description}
`;
  }

  private getConditionImmunities(): string {
    if (!this.monster.conditionImmunities.length) return '';
    return `**Condition Immunities** ${this.monster.conditionImmunities.join(', ')}`;
  }

  private getDamageImmunities(): string {
    if (!this.monster.damageImmunities.length) return '';
    return `**Damage Immunities** ${this.monster.damageImmunities.join(', ')}`;
  }

  private getDamageResistances(): string {
    if (!this.monster.damageResistances.length) return '';
    return `**Damage Resistances** ${this.monster.damageResistances.join(', ')}`;
  }

  private getDamageVulnerabilities(): string {
    if (!this.monster.damageVulnerabilities.length) return '';
    return `**Damage Vulnerabilities** ${this.monster.damageVulnerabilities.join(', ')}`;
  }

  private getSaves(): string {
    if (!this.monster.proficiencies.length) return '';

    const onlySaves = this.monster.proficiencies.filter(skill => {
      return skill.skill.includes('Saving Throw:');
    });

    if (!onlySaves.length) return '';

    const savesList = onlySaves.map(skill => {
      const valString = skill.value >= 0 ? `+${skill.value}` : `-${skill.value}`; 
      return `${skill.skill.replace('Saving Throw: ', '')}: ${valString}`;
    }).join(', ');

    return `**Saves** ${savesList}`;
  }

  private getSenses(): string {
    const sensesStr = Object.keys(this.monster.senses).map((key) => {
      const value = this.monster.senses[key];

      if (!value) return '';

      const label = this.getTitleCaseFromCamelCase(key);

      return `${label} ${value}`;
    }).filter(Boolean).join(', ');

    return `**Senses** ${sensesStr}`;
  }

  private getSkills(): string {
    if (!this.monster.proficiencies.length) return '';

    const onlySkills = this.monster.proficiencies.filter(skill => {
      return skill.skill.includes('Skill:');
    });

    if (!onlySkills.length) return '';

    const skillsList = onlySkills.map(skill => {
      const valString = skill.value >= 0 ? `+${skill.value}` : `-${skill.value}`; 
      return `${skill.skill.replace('Skill: ', '')}: ${valString}`;
    }).join(', ');
    
    return `**Skills** ${skillsList}`;
  }

  private getSpeed(): string {
    const speedStr = Object.keys(this.monster.speed).map((key) => {
      const value = this.monster.speed[key];

      if (!value) return '';

      if (key === 'walk') {
        return value;
      }

      const label = this.getTitleCaseFromCamelCase(key);

      return `${label} ${value}`;
    }).filter(Boolean).join(', ');
    
    return `**Speed** ${speedStr}`;
  }

  private getStatBlock(): string {
    return `| STR | DEX | CON | INT | WIS | CHA |
| --- | --- | --- | --- | --- | --- |
|  ${this.monster.stats.strength} | ${this.monster.stats.dexterity} | ${this.monster.stats.constitution} | ${this.monster.stats.intelligence} | ${this.monster.stats.wisdom} | ${this.monster.stats.charisma} |
| ${this.getStatMod(this.monster.stats.strength)} | ${this.getStatMod(this.monster.stats.dexterity)} | ${this.getStatMod(this.monster.stats.constitution)} | ${this.getStatMod(this.monster.stats.intelligence)} | ${this.getStatMod(this.monster.stats.wisdom)} | ${this.getStatMod(this.monster.stats.charisma)} |
`;
  }

  private getStatMod(score: number): number {
    return Math.floor(score / 2);
  }

  private getTitleCaseFromCamelCase(str: string): string {
    return str.replace(/([A-Z])/g, " $1");
  }
}
