import { ChangeEvent, useState } from 'react';
import { Input } from '@designSystem/components';
import {
  BLINDED,
  CHARMED,
  DEAFENED,
  EXHAUSTION,
  FRIGHTENED,
  GRAPPLED,
  INCAPACITATED,
  INVISIBLE,
  PARALYZED,
  PETRIFIED,
  POISONED,
  PRONE,
  RESTRAINED,
  STUNNED,
  UNCONSCIOUS
} from '../../rules/conditions';
import { Markdown } from '../Markdown';
import './RulesSearch.css';

export const RulesSearch = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value ?? '');
  }

  const conditions = [
    BLINDED,
    CHARMED,
    DEAFENED,
    EXHAUSTION,
    FRIGHTENED,
    GRAPPLED,
    INCAPACITATED,
    INVISIBLE,
    PARALYZED,
    PETRIFIED,
    POISONED,
    PRONE,
    RESTRAINED,
    STUNNED,
    UNCONSCIOUS
  ];

  const results = conditions
    .filter((condition) => {
      if (!searchTerm.trim()) return true;
      return condition.includes(searchTerm);
    })
    .map((condition, index) => {
      const searched = searchTerm.trim()
        ? condition.replace(searchTerm, `<span class="marked-inline-highlight">${searchTerm}</span>`)
        : condition;

      return (
        <Markdown
          content={searched}
          key={index}
        />
      );
  });

  const empty = (
    <div>
      No results found for "{searchTerm}".
    </div>
  );

  return (
    <div>
      <div className="rules-search-controls">
        <Input
          full
          inputId="rules"
          inputName="rules"
          onChange={handleOnChange}
          value={searchTerm}
        />
      </div>
      {
        results.length === 0 ? (
          empty
        ) : (
          results
        )
      }
    </div>
  );
};
