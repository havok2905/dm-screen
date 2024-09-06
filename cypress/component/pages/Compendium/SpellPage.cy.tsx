import { TEST_API_BASE } from '../../../support/constants';

import { ApplicationBootstrapper } from '../../../support/ApplicationBootstrapper';
import { SpellPage } from '../../../../src/dm-screen/pages';

const TEST_SPELL_ID = 'ae5e7b3f-b32e-467e-a632-fa63e126d810';

describe('SpellPage.cy.tsx', () => {
  beforeEach(() => {
    cy.intercept('GET', `${TEST_API_BASE}/spell/${TEST_SPELL_ID}`, {
      statusCode: 200,
      fixture: `pages/useSpell/${TEST_SPELL_ID}`
    });

    const pagePath = `/compendium/spell/${TEST_SPELL_ID}`;
    const pageRoute = '/compendium/spell/:id';

    window.history.pushState({}, pagePath, '/compendium/spell/ae5e7b3f-b32e-467e-a632-fa63e126d810');

    cy.mount(
      <ApplicationBootstrapper path={pagePath} route={pageRoute}>
        <SpellPage/>
      </ApplicationBootstrapper>
    );
  });

  it('should display a spell', () => {
    cy
      .get('[data-test-id="markdown-entity-view-page-name"]')
      .should('contain', 'Acid Arrow');

    cy
      .get('[data-test-id="markdown-entity-view-page-id"]')
      .should('contain', 'ae5e7b3f-b32e-467e-a632-fa63e126d81');

    cy
      .getTag()
      .eq(0)
      .should('contain', 'Concentration: false');

    cy
      .getTag()
      .eq(1)
      .should('contain', 'Level: 2');

    cy
      .getTag()
      .eq(2)
      .should('contain', 'Ritual: false');

    cy
      .getTag()
      .eq(3)
      .should('contain', 'School: Evocation');

    // Markdown generated
    cy
      .get('h1')
      .should('contain', 'Acid Arrow');
  });
});