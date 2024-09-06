import { TEST_API_BASE } from '../../../support/constants';

import { ApplicationBootstrapper } from '../../../support/ApplicationBootstrapper';
import { DmView } from '../../../../src/dm-screen/pages';
import {SocketClient} from '@core/socket';

const TEST_ADVENTURE_ID = '68c8bd92-04ff-4359-9856-8d2d6b02b69b';
const TEST_INITIATIVE_ID = '213ab6dc-aa75-486f-b991-4df439bc8d59';

describe('DmView.cy.tsx', () => {
  beforeEach(() => {
    cy.intercept('GET', `${TEST_API_BASE}/adventure/${TEST_ADVENTURE_ID}`, {
      statusCode: 200,
      fixture: `pages/DmView/useAdventure/${TEST_ADVENTURE_ID}`
    });

    cy.intercept('GET', `${TEST_API_BASE}/initiative/${TEST_ADVENTURE_ID}`, {
      statusCode: 200,
      fixture: `pages/DmView/useInitiative/${TEST_ADVENTURE_ID}`
    });

    cy.intercept('DELETE', `${TEST_API_BASE}/initiative/${TEST_INITIATIVE_ID}`, {
      statusCode: 200,
      fixture: `pages/DmView/useDestroyInitiative/${TEST_INITIATIVE_ID}`
    });

    cy.intercept('PATCH', `${TEST_API_BASE}/initiative/${TEST_INITIATIVE_ID}`, {
      statusCode: 200,
      fixture: `pages/DmView/useUpdateInitiative/${TEST_INITIATIVE_ID}`
    });

    cy.intercept('POST', `${TEST_API_BASE}/initiative/${TEST_ADVENTURE_ID}`, {
      statusCode: 200,
      fixture: `pages/DmView/useBootstrapInitiative/${TEST_ADVENTURE_ID}`
    });

    cy.stub(SocketClient.prototype, 'disconnect');
    cy.stub(SocketClient.prototype, 'init');

    cy.spy(SocketClient.prototype, 'emit').as('emit');

    cy.mount(
      <ApplicationBootstrapper>
        <DmView/>
      </ApplicationBootstrapper>
    );
  });

  it('should render default state', () => {
    // Renders table headers for creatures
    cy.getTableHeader(0, 0).should('contain', 'Creature');
    cy.getTableHeader(0, 1).should('contain', 'Type');
    cy.getTableHeader(0, 2).should('contain', 'AC');
    cy.getTableHeader(0, 3).should('contain', 'HP');
    cy.getTableHeader(0, 4).should('contain', 'CR');

    // Renders table headers for items
    cy.getTableHeader(1, 0).should('contain', 'Item');
    cy.getTableHeader(1, 1).should('contain', 'Rarity');
    cy.getTableHeader(1, 2).should('contain', 'Cost');

    // Renders table of creatures
    cy.getTableCell(0, 0, 0).should('contain', 'Playful Kitten');
    cy.getTableCell(0, 0, 1).should('contain', 'Beast');
    cy.getTableCell(0, 0, 2).should('contain', '15');
    cy.getTableCell(0, 0, 3).should('contain', '25');
    cy.getTableCell(0, 0, 4).should('contain', '1/2');
    cy.getTableCell(0, 1, 0).should('contain', 'Spectral Sock Puppet');
    cy.getTableCell(0, 1, 1).should('contain', 'Undead');
    cy.getTableCell(0, 1, 2).should('contain', '13');
    cy.getTableCell(0, 1, 3).should('contain', '40');
    cy.getTableCell(0, 1, 4).should('contain', '1');
    cy.getTableCell(0, 2, 0).should('contain', 'The Embroidermncer');
    cy.getTableCell(0, 2, 1).should('contain', 'Humanoid');
    cy.getTableCell(0, 2, 2).should('contain', '12');
    cy.getTableCell(0, 2, 3).should('contain', '60');
    cy.getTableCell(0, 2, 4).should('contain', '5');

    // Renders table of items
    cy.getTableCell(1, 0, 0).should('contain', 'Dagger');
    cy.getTableCell(1, 0, 1).should('contain', 'Common');
    cy.getTableCell(1, 0, 2).should('contain', '2GP');

    // Should not have players loaded on first render
    cy
      .get('[data-test-id="players-missing-text"]')
      .should('contain', 'There are no players set for this adventure.');

    cy
      .getButton()
      .eq(3)
      .should('contain', 'Add all to combat')
      .should('be.disabled');

    cy
      .getButton()
      .eq(4)
      .should('contain', 'Manage players')
      .should('be.enabled');

    // Should render handout
    cy
      .get('[data-test-id="adventure-handout-Embroidermancer Lair Map"]')
      .should('exist');

    // Should render initiative order
    cy
      .getInitiativeCard()
      .eq(0)
      .should('contain', 'Playful Kitten')
      .invoke('attr', 'class')
      .should('not.contain', 'initiative-card-active')
      .should('not.contain', 'initiative-card-hidden')
      .should('not.contain', 'initiative-card-removed');
    
    cy
      .getInitiativeCard()
      .eq(1)
      .should('contain', 'The Embroidermncer')
      .invoke('attr', 'class')
      .should('contain', 'initiative-card-active')
      .should('not.contain', 'initiative-card-hidden')
      .should('not.contain', 'initiative-card-removed');

    cy
      .getInitiativeCard()
      .eq(2)
      .should('contain', 'Playful Kitten')
      .invoke('attr', 'class')
      .should('not.contain', 'initiative-card-active')
      .should('not.contain', 'initiative-card-hidden')
      .should('not.contain', 'initiative-card-removed');

    // Removed will be invisible, but still in the dom
    cy
      .getInitiativeCard()
      .eq(3)
      .should('contain', 'Spectral Sock Puppet')
      .invoke('attr', 'class')
      .should('not.contain', 'initiative-card-active')
      .should('not.contain', 'initiative-card-hidden')
      .should('contain', 'initiative-card-removed');

    cy
      .getInitiativeCard()
      .eq(4)
      .should('contain', 'Spectral Sock Puppet')
      .invoke('attr', 'class')
      .should('not.contain', 'initiative-card-active')
      .should('contain', 'initiative-card-hidden')
      .should('not.contain', 'initiative-card-removed');

    // Should render current round
    cy
      .get('[data-test-id="initiative-order-state-round"]')
      .should('contain', 'Round: 1');

    // Should render start/end combat button
    cy
      .getLinkButton()
      .eq(0)
      .should('contain', 'End Combat');
  });

  it('should open rules and search for a rule', () => {
    cy
      .getIconButton()
      .eq(1)
      .trigger('click');

    cy
      .get('[data-test-id="rules-search-controls"]')
      .type('poison');

    cy
      .get('.marked-inline-highlight')
      .should('have.length', 2);
    
    cy
      .getSideDrawerHeader()
      .eq(0)
      .find('[data-test-id="dm-screen-design-system-icon-button"]')
      .eq(0)
      .trigger('click');

    cy
      .getSideDrawerContent()
      .should('not.exist');
  });

  it('should open the adventure and render markdown', () => {
    cy
      .getIconButton()
      .eq(0)
      .trigger('click');

    // Trust largely that marked.js is doing its thing. Test that # is turned into h1
    cy
      .getSideDrawerContent()
      .find('h1')
      .should('contain', 'The Embroidermancer');

    cy
      .getSideDrawerHeader()
      .eq(1)
      .find('[data-test-id="dm-screen-design-system-icon-button"]')
      .eq(0)
      .trigger('click');

    cy
      .getSideDrawerContent()
      .should('not.exist');
  });

  it('should search for a creature', () => {
    cy.getTableCell(0, 0, 0).should('contain', 'Playful Kitten');
    cy.getTableCell(0, 0, 1).should('contain', 'Beast');
    cy.getTableCell(0, 0, 2).should('contain', '15');
    cy.getTableCell(0, 0, 3).should('contain', '25');
    cy.getTableCell(0, 0, 4).should('contain', '1/2');

    cy
      .getSection()
      .eq(1)
      .find('input')
      .eq(0)
      .type('Spect');

    cy.getTableCell(0, 0, 0).should('contain', 'Spectral Sock Puppet');
    cy.getTableCell(0, 0, 1).should('contain', 'Undead');
    cy.getTableCell(0, 0, 2).should('contain', '13');
    cy.getTableCell(0, 0, 3).should('contain', '40');
    cy.getTableCell(0, 0, 4).should('contain', '1');
  });

  it('should search for a creature and find nothing', () => {
    cy.getTableCell(0, 0, 0).should('contain', 'Playful Kitten');
    cy.getTableCell(0, 0, 1).should('contain', 'Beast');
    cy.getTableCell(0, 0, 2).should('contain', '15');
    cy.getTableCell(0, 0, 3).should('contain', '25');
    cy.getTableCell(0, 0, 4).should('contain', '1/2');

    cy
      .getSection()
      .eq(1)
      .find('input')
      .eq(0)
      .type('Batman');

    cy
      .get('[data-test-id="no-creatures-found-text"]')
      .should('contain', 'No creatures found for "Batman"');
  });

  it('should search for an item', () => {
    cy.getTableCell(1, 0, 0).should('contain', 'Dagger');
    cy.getTableCell(1, 0, 1).should('contain', 'Common');
    cy.getTableCell(1, 0, 2).should('contain', '2GP');

    cy
      .getSection()
      .eq(2)
      .find('input')
      .eq(0)
      .type('Dag');

    cy.getTableCell(1, 0, 0).should('contain', 'Dagger');
    cy.getTableCell(1, 0, 1).should('contain', 'Common');
    cy.getTableCell(1, 0, 2).should('contain', '2GP');
  });

  it('should search for an item and find nothing', () => {
    cy.getTableCell(1, 0, 0).should('contain', 'Dagger');
    cy.getTableCell(1, 0, 1).should('contain', 'Common');
    cy.getTableCell(1, 0, 2).should('contain', '2GP');

    cy
      .getSection()
      .eq(2)
      .find('input')
      .eq(0)
      .type('Batman');

    cy
      .get('[data-test-id="no-items-found-text"]')
      .should('contain', 'No items found for "Batman"');
  });

  it('should roll a d20', () => {
    cy
      .stub(Math, 'random')
      .returns(0.5);

    cy
      .getToolbarFooter()
      .find('input')
      .eq(0)
      .type('/roll 1d20+4')
      .type('{enter}');

    cy
      .getToolbarFooter()
      .find('input')
      .eq(0)
      .invoke('attr', 'value')
      .should('equal', '');
    
    cy
      .get('[data-test-id="toolbar-footer-rolled-value"]')
      .should('contain', '15');
  });

  it('should clear initiative, start new combat, populate it with creatures and players, and sort', () => {
    // UI test to end combat state

    cy.intercept('GET', `${TEST_API_BASE}/initiative/${TEST_ADVENTURE_ID}`, {
      statusCode: 200,
      fixture: `pages/DmView/useInitiative/${TEST_ADVENTURE_ID}-empty`
    });
  
    cy
      .getLinkButton()
      .eq(0)
      .should('contain', 'End Combat')
      .trigger('click');
    
    cy
      .getLinkButton()
      .eq(0)
      .should('contain', 'Bootstrap Combat');

    cy
      .getInitiativeCard()
      .should('have.length', 0);

    cy
      .getButton()
      .eq(0)
      .should('contain', 'Prev')
      .should('be.disabled');

    cy
      .getButton()
      .eq(1)
      .should('contain', 'Next')
      .should('be.disabled');

    cy
      .getButton()
      .eq(2)
      .should('contain', 'Sort')
      .should('be.disabled');

    cy
      .get('[data-test-id="initiative-order-state-round"]')
      .should('contain', 'Out of initiative');

    // UI test to begin new combat state

    cy.intercept('GET', `${TEST_API_BASE}/initiative/${TEST_ADVENTURE_ID}`, {
      statusCode: 200,
      fixture: `pages/DmView/useInitiative/${TEST_ADVENTURE_ID}-new`
    });

    cy
      .getLinkButton()
      .eq(0)
      .trigger('click');

    cy
      .getLinkButton()
      .eq(0)
      .should('contain', 'End Combat');

    cy
      .getInitiativeCard()
      .should('have.length', 0);

    cy
      .getButton()
      .eq(0)
      .should('contain', 'Prev')
      .should('be.disabled');

    cy
      .getButton()
      .eq(1)
      .should('contain', 'Next')
      .should('be.disabled');

    cy
      .getButton()
      .eq(2)
      .should('contain', 'Sort')
      .should('be.disabled');

    cy
      .get('[data-test-id="initiative-order-state-round"]')
      .should('contain', 'Round: 1');

    // UI test to populate new combat state with players

    cy.intercept('GET', `${TEST_API_BASE}/initiative/${TEST_ADVENTURE_ID}`, {
      statusCode: 200,
      fixture: `pages/DmView/useInitiative/${TEST_ADVENTURE_ID}-added-player`
    });

    cy
      .getButton()
      .eq(4)
      .should('contain', 'Manage players')
      .trigger('click');

    cy
      .getModal()
      .find('button')
      .eq(0)
      .should('contain', 'Add Player')
      .should('be.disabled');

    cy
      .getModal()
      .find('input')
      .eq(0)
      .type('Player');

    cy
      .getModal()
      .find('input')
      .eq(1)
      .type('Character');

    cy
      .getModal()
      .find('input')
      .eq(2)
      .clear()
      .type('15');

    cy
      .getModal()
      .find('button')
      .eq(0)
      .should('contain', 'Add Player')
      .should('be.enabled')
      .trigger('click');

    cy
      .getModal()
      .should('not.exist');

    cy
      .getButton()
      .eq(3)
      .should('contain', 'Add all to combat')
      .should('be.enabled')
      .trigger('click');

    cy
      .getInitiativeCard()
      .should('have.length', 1);

    cy
      .getInitiativeCard()
      .eq(0)
      .should('contain', 'Player')
      .invoke('attr', 'class')
      .should('not.contain', 'initiative-card-active')
      .should('not.contain', 'initiative-card-hidden')
      .should('not.contain', 'initiative-card-removed');
    
    cy
      .getInitiativeCard()
      .eq(0)
      .find('input')
      .eq(0)
      .invoke('attr', 'value')
      .should('contain', '0');

    cy
      .getInitiativeCard()
      .eq(0)
      .find('input')
      .eq(1)
      .invoke('attr', 'value')
      .should('contain', '15');

    cy
      .getInitiativeCard()
      .eq(0)
      .find('input')
      .eq(2)
      .invoke('attr', 'value')
      .should('contain', '0');

    cy
      .getButton()
      .eq(0)
      .should('contain', 'Prev')
      .should('be.enabled');

    cy
      .getButton()
      .eq(1)
      .should('contain', 'Next')
      .should('be.enabled');

    cy
      .getButton()
      .eq(2)
      .should('contain', 'Sort')
      .should('be.enabled');

    cy.intercept('GET', `${TEST_API_BASE}/initiative/${TEST_ADVENTURE_ID}`, {
      statusCode: 200,
      fixture: `pages/DmView/useInitiative/${TEST_ADVENTURE_ID}-added-creature`
    });

    cy
      .getTableCell(1, 0, 5)
      .find('button')
      .eq(2)
      .should('contain', 'Add')
      .trigger('click');

    cy
      .getInitiativeCard()
      .should('have.length', 2);

    cy
      .getInitiativeCard()
      .eq(1)
      .should('contain', 'Playful Kitten')
      .invoke('attr', 'class')
      .should('not.contain', 'initiative-card-active')
      .should('not.contain', 'initiative-card-hidden')
      .should('not.contain', 'initiative-card-removed');

    cy
      .getInitiativeCard()
      .eq(1)
      .find('input')
      .eq(0)
      .invoke('attr', 'value')
      .should('contain', '0');

    cy
      .getInitiativeCard()
      .eq(1)
      .find('input')
      .eq(1)
      .invoke('attr', 'value')
      .should('contain', '15');

    cy
      .getInitiativeCard()
      .eq(1)
      .find('input')
      .eq(2)
      .invoke('attr', 'value')
      .should('contain', '25');
    
    // UI test to traverse new combat state

    cy.intercept('GET', `${TEST_API_BASE}/initiative/${TEST_ADVENTURE_ID}`, {
      statusCode: 200,
      fixture: `pages/DmView/useInitiative/${TEST_ADVENTURE_ID}-sorted`
    });

    cy
      .getButton()
      .eq(2)
      .should('contain', 'Sort')
      .should('be.enabled')
      .trigger('click');

    cy
      .getInitiativeCard()
      .eq(0)
      .should('contain', 'Playful Kitten')
      .invoke('attr', 'class')
      .should('contain', 'initiative-card-active')
      .should('not.contain', 'initiative-card-hidden')
      .should('not.contain', 'initiative-card-removed');

    cy
      .getInitiativeCard()
      .eq(1)
      .should('contain', 'Player')
      .invoke('attr', 'class')
      .should('not.contain', 'initiative-card-active')
      .should('not.contain', 'initiative-card-hidden')
      .should('not.contain', 'initiative-card-removed');
  });

  it('it should toggle an item to and from hidden', () => {
    cy
      .getInitiativeCard()
      .eq(0)
      .should('contain', 'Playful Kitten')
      .trigger('dblclick');

    cy
      .getModal()
      .eq(0)
      .find('button')
      .eq(2)
      .should('be.disabled')
      .should('contain', 'Reveal');

    cy.intercept('GET', `${TEST_API_BASE}/initiative/${TEST_ADVENTURE_ID}`, {
      statusCode: 200,
      fixture: `pages/DmView/useInitiative/${TEST_ADVENTURE_ID}-hide`
    });

    cy
      .getModal()
      .eq(0)
      .find('button')
      .eq(1)
      .should('be.enabled')
      .should('contain', 'Hide')
      .trigger('click');

    cy
      .getModal()
      .eq(0)
      .find('button')
      .eq(1)
      .should('be.disabled')
      .should('contain', 'Hide');

    cy
      .getInitiativeCard()
      .eq(0)
      .should('contain', 'Playful Kitten')
      .invoke('attr', 'class')
      .should('not.contain', 'initiative-card-active')
      .should('contain', 'initiative-card-hidden')
      .should('not.contain', 'initiative-card-removed');

    cy.intercept('GET', `${TEST_API_BASE}/initiative/${TEST_ADVENTURE_ID}`, {
      statusCode: 200,
      fixture: `pages/DmView/useInitiative/${TEST_ADVENTURE_ID}`
    });

    cy
      .getModal()
      .eq(0)
      .find('button')
      .eq(2)
      .should('be.enabled')
      .should('contain', 'Reveal')
      .trigger('click', { force: true });

    cy
      .getInitiativeCard()
      .eq(0)
      .should('contain', 'Playful Kitten')
      .invoke('attr', 'class')
      .should('not.contain', 'initiative-card-active')
      .should('not.contain', 'initiative-card-hidden')
      .should('not.contain', 'initiative-card-removed');
  });

  it('it should remove an item', () => {
    cy
      .getInitiativeCard()
      .eq(0)
      .should('contain', 'Playful Kitten')
      .trigger('dblclick');

    cy.intercept('GET', `${TEST_API_BASE}/initiative/${TEST_ADVENTURE_ID}`, {
      statusCode: 200,
      fixture: `pages/DmView/useInitiative/${TEST_ADVENTURE_ID}-remove`
    });

    cy
      .getModal()
      .eq(0)
      .find('button')
      .eq(0)
      .should('be.enabled')
      .should('contain', 'Remove')
      .trigger('click');

    cy
      .getInitiativeCard()
      .eq(0)
      .should('contain', 'Playful Kitten')
      .invoke('attr', 'class')
      .should('not.contain', 'initiative-card-active')
      .should('not.contain', 'initiative-card-hidden')
      .should('contain', 'initiative-card-removed');
  });

  it('should show a creature', () => {
    cy
      .getTableCell(0, 0, 5)
      .find('button')
      .eq(1)
      .should('contain', 'Show')
      .trigger('click');

    cy
      .get('@emit')
      .should('have.been.calledWith', 'handout:dispatch-show');
  });

  it('should show an item', () => {
    cy
      .getTableCell(1, 0, 3)
      .find('button')
      .eq(1)
      .should('contain', 'Show')
      .trigger('click');

    cy
      .get('@emit')
      .should('have.been.calledWith', 'handout:dispatch-show');
  });

  it('should show a handout', () => {
    cy
      .get('[data-test-id="adventure-handout-Embroidermancer Lair Map"]')
      .trigger('click');

    cy
      .get('@emit')
      .should('have.been.calledWith', 'handout:dispatch-show');
  });

  it('should open a creature', () => {
    cy
      .getTableCell(0, 0, 5)
      .find('button')
      .eq(0)
      .trigger('click');

    cy
      .getModal()
      .should('contain', 'Playful Kitten');

    cy
      .getModalBackdrop()
      .trigger('click', { force: true });

    cy
      .getModal()
      .should('not.exist');
  });

  it('should open an item', () => {
    cy
      .getTableCell(1, 0, 3)
      .find('button')
      .eq(0)
      .trigger('click');

    cy
      .getModal()
      .should('contain', 'Dagger');

    cy
      .getModalBackdrop()
      .trigger('click', { force: true });

    cy
      .getModal()
      .should('not.exist');
  });

  it('should show open a player\'s initiative card', () => {
    cy
      .getInitiativeCard()
      .eq(0)
      .should('contain', 'Playful Kitten')
      .trigger('dblclick');
    
    cy
      .getModal()
      .should('contain', 'Playful Kitten');

    cy
      .getModalBackdrop()
      .trigger('click', { force: true });

    cy
      .getModal()
      .should('not.exist');
  });

  it('should open the player modal and cancel', () => {
    cy
      .getButton()
      .eq(4)
      .should('contain', 'Manage players')
      .trigger('click');

      cy
        .getModal()
        .find('button')
        .eq(1)
        .should('contain', 'Cancel')
        .trigger('click');

      cy
        .getModal()
        .should('not.exist');
  });

  it('should add a player and remove it', () => {
    cy
      .getButton()
      .eq(4)
      .should('contain', 'Manage players')
      .trigger('click');

    cy
      .getModal()
      .find('button')
      .eq(0)
      .should('contain', 'Add Player')
      .should('be.disabled');

    cy
      .getModal()
      .find('input')
      .eq(0)
      .type('Player');

    cy
      .getModal()
      .find('input')
      .eq(1)
      .type('Character');

    cy
      .getModal()
      .find('input')
      .eq(2)
      .clear()
      .type('15');

    cy
      .getModal()
      .find('button')
      .eq(0)
      .should('contain', 'Add Player')
      .should('be.enabled')
      .trigger('click');

    cy
      .getModal()
      .should('not.exist');

    cy.getTableHeader(0, 0).should('contain', 'Player');
    cy.getTableHeader(0, 1).should('contain', 'Character');
    cy.getTableHeader(0, 2).should('contain', 'AC');

    cy.getTableCell(0, 0, 0).should('contain', 'Player');
    cy.getTableCell(0, 0, 1).should('contain', 'Character');
    cy.getTableCell(0, 0, 2).should('contain', '15');

    cy
      .get('[data-test-id="players-missing-text"]')
      .should('not.exist');

    cy
      .getTableCell(0, 0, 3)
      .find('button')
      .eq(0)
      .trigger('click');

    cy
      .get('[data-test-id="players-missing-text"]')
      .should('contain', 'There are no players set for this adventure.');
  });
});