import {
  ChangeEvent,
  KeyboardEvent,
  useState
} from 'react';

import { diceRoller } from '@core/diceRoller';
import { Handout } from '@core/types';

import {
  IconButton,
  Input,
  LinkButton
} from '@designSystem/components';

import './ToolbarFooter.css';

export interface ToolbarFooterProps {
  handleShowHandout: (handout: Handout | null) => void;
  setIsNotesDrawerOpen: (value: boolean) => void;
  setIsSideDrawerOpen: (value: boolean) => void;
}

export const ToolbarFooter = ({
  handleShowHandout,
  setIsNotesDrawerOpen,
  setIsSideDrawerOpen
}: ToolbarFooterProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [rolledValue, setRolledValue] = useState<number | null>(null);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setRolledValue(null);
      setSearchTerm('');

      const target = e.target as HTMLInputElement;
      const result = diceRoller(target.value ?? '');

      setRolledValue(result);
    }
  };
  
  return (
    <div
      className="toolbar-footer"
      data-test-id="toolbar-footer"
    >
      <div>
        <Input
          inputId="console"
          inputName="console"
          onChange={handleOnChange}
          onKeyDown={handleOnKeyDown}
          value={searchTerm}/>
        <span
          className="toolbar-footer-rolled-value"
          data-test-id="toolbar-footer-rolled-value"
        >
          {rolledValue}
        </span>
      </div>
      <div>
        <LinkButton
          buttonText="Clear Handouts"
          color="red"
          onClick={() => {
            handleShowHandout(null);
          }}/>
        <IconButton
          icon="book"
          onClick={() => {
            setIsNotesDrawerOpen(true);
          }}
        />
        <IconButton
          icon="menu"
          onClick={() => {
            setIsSideDrawerOpen(true);
          }}
        />
      </div>
    </div>
  );
};
