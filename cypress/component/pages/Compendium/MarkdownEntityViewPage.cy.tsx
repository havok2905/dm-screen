import { ApplicationBootstrapper } from '../../../support/ApplicationBootstrapper';
import { MarkdownEntityViewPage } from '../../../../src/dm-screen/pages/Compendium/components/MarkdownEntityViewPage';
import { SPELLS_PATH } from '../../../../src/dm-screen/routes';

const TEST_ITEM_ID = 'ae5e7b3f-b32e-467e-a632-fa63e126d810';

const pagePath = `/compendium/spell/${TEST_ITEM_ID}`;
const pageRoute = '/compendium/spell/:id';

const backLinkLabel = 'Back to spells';
const backLinkPath = SPELLS_PATH;

const mountPage = (isLoading = false) => {
  window.history.pushState({}, pagePath, pagePath);

  cy.mount(
    <ApplicationBootstrapper path={pagePath} route={pageRoute}>
      <MarkdownEntityViewPage
        backLinkLabel={backLinkLabel}
        backLinkPath={backLinkPath}
        isLoading={isLoading}
        markdownEntity={{
          content: '# Acid Arrow',
          id: TEST_ITEM_ID,
          image: '',
          metadata: [
            {
              name: 'Concentration',
              type: 'boolean',
              value: false
            },
            {
              name: 'Level',
              type: 'number',
              value: 2
            },
            {
              name: 'Ritual',
              type: 'boolean',
              value: false
            },
            {
              name: 'School',
              type: 'string',
              value: 'Evocation'
            }
          ],
          name: 'Acid Arrow'
        }}
      />
    </ApplicationBootstrapper>
  );
};

describe('MarkdownEntityViewPage.cy.tsx', () => {
  it('should be loading', () => {
    mountPage(true);

    cy
      .get('.lds-roller')
      .should('exist');
  });

  it('should display an item', () => {
    mountPage();

    cy
      .get('.lds-roller')
      .should('not.exist');

    cy
      .get('[data-test-id="markdown-entity-view-page-back-to-link"]')
      .first()
      .should('contain', backLinkLabel)
      .find('a')
      .invoke('attr', 'href')
      .should('eql', backLinkPath);

    cy
      .get('[data-test-id="markdown-entity-view-page-name"]')
      .should('contain', 'Acid Arrow');

    cy
      .get('[data-test-id="markdown-entity-view-page-id"]')
      .should('contain', TEST_ITEM_ID);

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