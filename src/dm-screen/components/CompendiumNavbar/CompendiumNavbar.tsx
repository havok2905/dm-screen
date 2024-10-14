import './CompendiumNavbar.css';

import { Link } from 'react-router-dom';

import {
  ADVENTURES_PATH,
  CREATURES_PATH,
  EQUIPMENT_ITEMS_PATH,
  IMPORTS_PATH,
  MAGIC_ITEMS_PATH,
  ROOT_PATH,
  SPELLS_PATH
} from '../../routes';

export const CompendiumNavbar = () => {
  return (
    <nav className="compendium-navbar">
      <h1>
        <Link to={ROOT_PATH}>
          Compendium
        </Link>
      </h1>
      <ul>
        <li>
          <Link to={ADVENTURES_PATH}>
            Adventures
          </Link>
        </li>
        <li>
          <Link to={CREATURES_PATH}>
            Creatures
          </Link>
        </li>
        <li>
          <Link to={EQUIPMENT_ITEMS_PATH}>
            Equipment Items
          </Link>
        </li>
        <li>
          <Link to={MAGIC_ITEMS_PATH}>
            Magic Items
          </Link>
        </li>
        <li>
          <Link to={SPELLS_PATH}>
            Spells
          </Link>
        </li>
        <li>
          <Link to={IMPORTS_PATH}>
            Imports
          </Link>
        </li>
      </ul>
    </nav>
  );
};
