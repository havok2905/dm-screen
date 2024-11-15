import { ApplicationBootstrapper } from '../../../support/ApplicationBootstrapper';
import { MarkdownEntityEditPage } from '../../../../src/dm-screen/pages/Compendium/components/MarkdownEntityEditPage';
import { TEST_API_BASE } from '../../../support/constants';

const TEST_ITEM_ID = 'ae5e7b3f-b32e-467e-a632-fa63e126d810';

const pagePath = '/compendium/creature/edit';
const pageRoute = '/compendium/creature/edit';

const saveButtonText = 'Save thing';
const updateIsErrorText = 'There was an error saving this thing';

const mountPage = (isError = false) => {
  window.history.pushState({}, pagePath, pagePath);

  const updateFunction = cy.stub().as('updateFunction');

  cy.mount(
    <ApplicationBootstrapper path={pagePath} route={pageRoute}>
      <MarkdownEntityEditPage
        entityType="creature"
        item={{
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
        refetch={() => {}}
        saveButtonText={saveButtonText}
        updateFunction={updateFunction}
        updateIsError={isError}
        updateIsErrorText={updateIsErrorText}
      />
    </ApplicationBootstrapper>
  );

  // Wait for markdown editor
  cy.wait(300);
};

describe('MarkdownEntityEditPage.cy.tsx', () => {
  it('should render in a default state', () => {
    mountPage();

    cy
      .getButton()
      .last()
      .should('contain', saveButtonText)
      .should('be.enabled');
  });

  it('should display an error if name is less than 3 characters and revert when valid', () => {
    mountPage();

    cy
      .getInput()
      .first()
      .clear()
      .type('aa')
      .blur();

    cy
      .getInputError()
      .should('contain', 'A name must be at least 3 characters.');

    cy
      .getInput()
      .first()
      .clear()
      .blur();

    cy
      .getInputError()
      .should('contain', 'A name is required');

    cy
      .getButton()
      .last()
      .should('contain', saveButtonText)
      .should('be.disabled');

    cy
      .getInput()
      .first()
      .type('aaa')
      .blur();

    cy
      .getInputError()
      .should('not.exist');

    cy
      .getButton()
      .last()
      .should('contain', saveButtonText)
      .should('be.enabled');
  });

  it('should update markdown as we type in the editor', () => {
    mountPage();

    cy
      .get('textarea')
      .first()
      .type('# Hello, test', { force: true });

    cy
      .get('h1')
      .should('contain', 'Hello, test');
  });

  it('should display an error when the save did not work', () => {
    mountPage(true);

    cy
      .get('[data-test-id="markdown-entity-edit-page-error"]')
      .should('contain', updateIsErrorText);
  });

  it('should add a metadata item', () => {
    mountPage();

    cy
      .get('[data-test-id="metadata-field"]')
      .should('have.length', 4);

    cy
      .getLinkButton()
      .trigger('click');

    cy
      .get('[data-test-id="metadata-field"]')
      .should('have.length', 5);
  });

  it('should remove a metadata item', () => {
    mountPage();

    cy
      .get('[data-test-id="metadata-field"]')
      .should('have.length', 4);

    cy
      .getIconButton()
      .eq(0)
      .trigger('click');

    cy
      .get('[data-test-id="metadata-field"]')
      .should('have.length', 3);
  });

  it('should edit and save an item', () => {
    mountPage();

    cy.intercept('PUT', `${TEST_API_BASE}/creature/${TEST_ITEM_ID}}`, {
      statusCode: 200
    });

    cy
      .getInput()
      .first()
      .type('aaa')
      .blur();

    cy
      .get('input[type="checkbox"]')
      .eq(0)
      .check();

    cy
      .get('input')
      .eq(4)
      .clear()
      .type('100');

      cy
      .get('input[type="checkbox"]')
      .eq(1)
      .check();

    cy
      .get('input')
      .eq(8)
      .clear()
      .type('Transmutation');

    cy
      .get('textarea')
      .first()
      .type('# Hello, test', { force: true });

    cy
      .getButton()
      .last()
      .should('contain', saveButtonText)
      .should('be.enabled')
      .trigger('click');

    cy.get('form').submit();

    cy
      .get('@updateFunction')
      .should('have.been.called');
  });
});