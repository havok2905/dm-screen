import {
  ChangeEvent,
  useState
} from 'react';
import {
  Input,
  SimpleList
} from '@designSystem/components';

import { MarkdownEntity } from '@core/types';

import './SpellsSearch.css';
import {Markdown} from '../Markdown';

export interface SpellsSearchProps {
  spells: MarkdownEntity[];
};

export const SpellsSearch = ({
  spells
}: SpellsSearchProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value ?? '');
  };

  const results = spells
    .filter((spell) => {
      if (!searchTerm.trim()) return true;
      return spell.name.includes(searchTerm);
    })
    .sort((a, b) => {
      const aLevel = a.metadata.find(item => item.name === 'Level')!.value;
      const bLevel = b.metadata.find(item => item.name === 'Level')!.value;

      if (aLevel > bLevel) return 1;
      if (aLevel < bLevel) return -1;

      if (a.name > b.name) return 1;
      if (a.name < b.name) return  -1;

      return 0; 
    })
    .map((spell) => {
      const level = spell.metadata.find(item => item.name === 'Level')!.value;
      return {
        label: `${level} - ${spell.name}`,
        hiddenContentRenderer: () => {
          return (
            <Markdown content={spell.content}/>
          );
        }
      };
    })


  return (
    <div>
      <div
        className="spells-search-controls"
        data-test-id="spells-search-controls"
      >
        <Input
          full
          inputId="rules"
          inputName="rules"
          onChange={handleOnChange}
          value={searchTerm}
        />
      </div>
      <h3>Spells</h3>
      <SimpleList items={results}/>
    </div>
  );
};
