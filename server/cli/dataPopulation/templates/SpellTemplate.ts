import { SpellItem } from '../types';

export class SpellTemplate {
  private spell: SpellItem;

  constructor(spell: SpellItem) {
    this.spell = spell;
  }

  render(): string {
    return `# ${this.spell.name}

**Level:** ${this.spell.level}

**School:** ${this.spell.school}

**Range:** ${this.spell.range}

**Casting Time:** ${this.spell.castingTime}

**Duration:** ${this.spell.duration}

**Components:** ${this.spell.components.join(', ')}

**Materials:** ${this.spell.material}

**Concentration:** ${this.spell.concentration ? 'Yes' : 'No'}

**Ritual:** ${this.spell.ritual ? 'Yes' : 'No'}

${this.getAreaOfEffect()}

${this.getDescription()}

${this.getAtHigherLevels()}
`;
  }
  private getAreaOfEffect(): string {
    if (!this.spell.areaOfEffect) return '';
    return `**Area of Effect:** ${this.spell.areaOfEffect.size} ${this.spell.areaOfEffect.type}`;
  }

  private getAtHigherLevels(): string {
    if (!this.spell.higherLevel) return '';
    return `## At Higher Levels

${this.spell.higherLevel}`;
  }

  private getDescription(): string {
    if (!this.spell.description) return '';
    return `${this.spell.description}`;
  }
}
