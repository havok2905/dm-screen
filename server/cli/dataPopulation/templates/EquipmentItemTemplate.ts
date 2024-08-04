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

${this.getDescription()}

${this.getProperties()}

${this.getContents()}
`;
  }

  private getDescription(): string {
    if (!this.item.description) return '';
    return `${this.item.description}`;
  }

  private getGearCategory(): string {
    if (!this.item.gearCategory) return '';
    return `**Gear Category** ${this.item.gearCategory}`;
  }

  private getContents(): string {
    if (!this.item.contents.length) return '';
    
    const itemsStr = this.item.contents.map(i => `- ${i.quantity} ${i.item}\n`).join('');

    return `## Contents

${itemsStr}`;
  }

  private getProperties(): string {
    if (!this.item.properties.length) return '';
    
    const itemsStr = this.item.properties.map(i => `- ${i}\n`).join('');

    return `## Properties

${itemsStr}`;
  }
}
