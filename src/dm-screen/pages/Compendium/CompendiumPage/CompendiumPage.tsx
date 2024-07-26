import { Container } from '@designSystem/components';
import { Link } from 'react-router-dom';

import { ADVENTURES_PATH } from '../../../routes';

export const CompendiumPage = () => {
  return (
    <Container>
      <h1>
        Compendium
      </h1>
      <Link to={ADVENTURES_PATH}>
        Adventures
      </Link>
    </Container>
  );
};
