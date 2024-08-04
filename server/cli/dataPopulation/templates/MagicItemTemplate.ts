import { MagicItem } from '../types';

export class MagicItemTemplate {
  private item: MagicItem;

  constructor(item: MagicItem) {
    this.item = item;
  }

  render(): string {
    return `# ${this.item.name}

${this.item.description}
`;
  }
}