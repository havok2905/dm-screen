import { CREATURE_METADATA } from '@templates/metadata/creature';
import { CREATURE_TEMPLATE } from '@templates/markdown/creature';

import { ApplicationBootstrapper } from '../../../support/ApplicationBootstrapper';
import { MarkdownEntityCreatePage } from '../../../../src/dm-screen/pages/Compendium/components/MarkdownEntityCreatePage';
import { TEST_API_BASE } from '../../../support/constants';

const pagePath = '/compendium/creature/create';
const pageRoute = '/compendium/creature/create';

const backToLinkPath = '/';
const backToLinkString = 'Back to thing';
const createIsErrorText = 'There was an error saving this thing';
const saveButtonText = 'Save thing';
const titleString = 'Create New Thing';

const mountPage = (isError = false) => {
  window.history.pushState({}, pagePath, pagePath);

  const updateFunction = cy.stub().as('updateFunction');

  cy.mount(
    <ApplicationBootstrapper path={pagePath} route={pageRoute}>
      <MarkdownEntityCreatePage
        backToLinkPath={backToLinkPath}
        backToLinkString={backToLinkString}
        createIsError={isError}
        createIsErrorText={createIsErrorText}
        initialMetaData={CREATURE_METADATA}
        saveButtonText={saveButtonText}
        template={CREATURE_TEMPLATE}
        titleString={titleString}
        updateFunction={updateFunction}
      />
    </ApplicationBootstrapper>
  );

  // Wait for markdown editor
  cy.wait(300);
};

describe('MarkdownEntityCreatePage.cy.tsx', () => {
  it('should render in a default state', () => {
    mountPage();

    cy
      .get('[data-test-id="markdown-entity-create-page-name"]')
      .should('contain', titleString);

    cy
      .get('[data-test-id="markdown-entity-create-page-back-to-link"]')
      .should('contain', backToLinkString)
      .find('a')
      .invoke('attr', 'href')
      .should('eql', backToLinkPath);

    cy
      .getButton()
      .last()
      .should('contain', saveButtonText)
      .should('be.disabled');
  });

  it('should display an error if name is less than 3 characters and revert when valid', () => {
    mountPage();

    cy
      .getInput()
      .first()
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

  it('should display an error when the save did not work', () => {
    mountPage(true);

    cy
      .get('[data-test-id="markdown-entity-create-page-error"]')
      .should('contain', createIsErrorText);
  });

  it('should edit and save an item', () => {
    mountPage();

    cy.intercept('POST', `${TEST_API_BASE}/creatures/}`, {
      statusCode: 200
    });

    cy
      .getInput()
      .first()
      .type('aaa')
      .blur();

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