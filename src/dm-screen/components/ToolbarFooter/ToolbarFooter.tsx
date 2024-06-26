import {
  ChangeEvent,
  KeyboardEvent,
  useState
} from 'react';

import {
  IconButton,
  Input
} from '@designSystem/components';

import './ToolbarFooter.css';

export interface ToolbarFooterProps {
  setIsSideDrawerOpen: (value: boolean) => void;
}

export const ToolbarFooter = ({
  setIsSideDrawerOpen
}: ToolbarFooterProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [rolledValue, setRolledValue] = useState<number | null>(null);

  const rollRegex = /^(\/roll)\s(\d+)d(\d+)(([+-])(\d+))?$/;

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Up') {
      console.log('up');
    }

    if (e.key === 'Enter') {
      setRolledValue(null);
      setSearchTerm('');

      const match = rollRegex.exec(e.target.value ?? '');
      
      if (!match) return;

      const numDice = Number(match[2] ?? 0);
      const dieValue = Number(match[3] ?? 0);
      const operator = match[5];
      const addition = Number(match[6] ?? 0);

      let value = 0;

      for(let x=0; x<numDice; x++) {
        const roll = Math.ceil(Math.random() * dieValue);
        value += roll;
      }

      const toAdd = operator === '-'
        ? addition * -1
        : addition;
      
      value += toAdd;

      setRolledValue(value);
    }
  };
  
  return (
    <div className="toolbar-footer">
      <div>
        <Input
          inputId="console"
          inputName="console"
          onChange={handleOnChange}
          onKeyDown={handleOnKeyDown}
          value={searchTerm}/>
        <span className="toolbar-footer-rolled-value">
          {rolledValue}
        </span>
      </div>
      <IconButton
        icon="menu"
        onClick={() => {
          setIsSideDrawerOpen(true);
        }}
      />
    </div>
  );
};
