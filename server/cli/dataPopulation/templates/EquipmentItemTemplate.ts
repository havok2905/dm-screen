import { EquipmentItem } from '../types';

export class EquipmentItemTemplate {
  private item: EquipmentItem;

  constructor(item: EquipmentItem) {
    this.item = item;
  }

  render(): string {
    return `# ${this.item.name}

**Equipment Category** ${this.item.equipmentCategory}

${this.getGearCategory()}

${this.getArmorCategory()}

${this.getArmorClass()}

${this.getStealthDisadvantage()}

${this.getMinimumStrength()}

${this.getCapacity()}

${this.getDescription()}

${this.getProperties()}

${this.getContents()}
`;
  }

  private getArmorCategory(): string {
    if (!this.item.armorCategory) return '';
    return `**Armor Category** ${this.item.armorCategory}`;
  }

  private getArmorClass(): string {
    if (!this.item.armorClass) return '';
    const bonusString = this.item.armorClass?.maxBonus ? ` (max ${this.item.armorClass?.maxBonus ?? 0})` : '';
    const dexString = this.item.armorClass?.dexBonus ? ` + Dex modifier${bonusString}` : '';

    return `**Armor Class** ${this.item.armorClass.base} ${dexString}`;
  }

  private getCapacity(): string {
    if (!this.item.capacity) return '';
    return `**Capacity** ${this.item.capacity}`;
  }

  private getContents(): string {
    if (!this.item.contents.length) return '';
    
    const itemsStr = this.item.contents.map(i => `- ${i.quantity} ${i.item}\n`).join('');

    return `## Contents

${itemsStr}`;
  }

  private getDescription(): string {
    if (!this.item.description) return '';
    return `${this.item.description}`;
  }

  private getGearCategory(): string {
    if (!this.item.gearCategory) return '';
    return `**Gear Category** ${this.item.gearCategory}`;
  }

  private getMinimumStrength(): string {
    if (!this.item.strMinimum) return '';
    return `**Minimum Strength** ${this.item.strMinimum}`;
  }

  private getProperties(): string {
    if (!this.item.properties.length) return '';
    
    const itemsStr = this.item.properties.map(i => `- ${i}\n`).join('');

    return `## Properties

${itemsStr}`;
  }

  private getStealthDisadvantage(): string {
    if (!this.item.stealthDisadvantage) return '';
    return `**Stealth** Disadvantage`;
  }
}
