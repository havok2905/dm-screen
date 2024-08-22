import { Container } from '@designSystem/components';
import { Link } from 'react-router-dom';

import {
  ADVENTURES_PATH,
  CREATURES_PATH,
  EQUIPMENT_ITEMS_PATH,
  MAGIC_ITEMS_PATH,
  SPELLS_PATH
} from '../../../routes';

import { CompendiumNavbar } from '../../../components';

export const CompendiumPage = () => {
  return (
    <>
      <CompendiumNavbar/>
      <Container>
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
        </ul>
      </Container>
    </>
  );
};
