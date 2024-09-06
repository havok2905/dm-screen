/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

const getButton = () => {
  return cy.get('[data-test-id="dm-screen-design-system-button"]');
};

const getIconButton = () => {
  return cy.get('[data-test-id="dm-screen-design-system-icon-button"]');
};

const getInitiativeCard = () => {
  return cy.get('[data-test-id="initiative-card"]');
};

const getInput = () => {
  return cy.get('[data-test-id="dm-screen-design-system-input"]');
};

const getLinkButton = () => {
  return cy.get('[data-test-id="dm-screen-design-system-link-button"]');
};

const getModal = () => {
  return cy.get('[data-test-id="dm-screen-design-system-modal"]');
};

const getModalBackdrop = () => {
  return cy.get('[data-test-id="dm-screen-design-system-modal-backdrop"]');
};

const getSection = () => {
  return cy.get('[data-test-id="dm-screen-design-system-section"]');
}

const getSideDrawerContent = () => {
  return cy.get('[data-test-id="dm-screen-design-system-side-drawer-content"]');
}

const getSideDrawerHeader = () => {
  return cy.get('[data-test-id="dm-screen-design-system-side-drawer-header"]');
}

const getTable = (index: number) => {
  return cy.get('[data-test-id="dm-screen-design-system-table"]').eq(index);
};

const getTag = () => {
  return cy.get('[data-test-id="dm-screen-design-system-tag"]');
}

const getTableRow = (
  tableIndex: number,
  rowIndex: number
) => {
  const table = getTable(tableIndex);
  return table.find('[data-test-id="dm-screen-design-system-table-row"]').eq(rowIndex);
};

const getTableCell = (
  tableIndex: number,
  rowIndex: number,
  cellIndex: number
) => {
  const table = getTableRow(tableIndex, rowIndex);
  return table.find('[data-test-id="dm-screen-design-system-table-cell"]').eq(cellIndex);
};

const getTableHeader = (
  tableIndex: number,
  cellIndex: number
) => {
  const table = getTable(tableIndex);
  return table.find('[data-test-id="dm-screen-design-system-table-header"]').eq(cellIndex);
};

const getToolbarFooter = () => {
  return cy.get('[data-test-id="toolbar-footer"]');
};

type ChainableElement = Cypress.Chainable<JQuery<HTMLElement>>;

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  interface Chainable {
    getButton(): ChainableElement
    getIconButton(): ChainableElement
    getInitiativeCard(): ChainableElement
    getInput(): ChainableElement
    getLinkButton(): ChainableElement
    getModal(): ChainableElement
    getModalBackdrop(): ChainableElement
    getSection(): ChainableElement
    getSideDrawerContent(): ChainableElement
    getSideDrawerHeader(): ChainableElement
    getTable(tableIndex: number): ChainableElement
    getTableCell(tableIndex: number, rowIndex: number, cellIndex: number): ChainableElement
    getTableHeader(tableIndex: number, cellIndex: number): ChainableElement
    getTableRow(tableIndex: number, rowIndex: number): ChainableElement
    getTag(): ChainableElement
    getToolbarFooter(): ChainableElement
  }
}

Cypress.Commands.add('getButton', getButton);
Cypress.Commands.add('getIconButton', getIconButton);
Cypress.Commands.add('getInitiativeCard', getInitiativeCard);
Cypress.Commands.add('getInput', getInput);
Cypress.Commands.add('getLinkButton', getLinkButton);
Cypress.Commands.add('getModal', getModal);
Cypress.Commands.add('getModalBackdrop', getModalBackdrop);
Cypress.Commands.add('getSection', getSection)
Cypress.Commands.add('getSideDrawerContent', getSideDrawerContent);
Cypress.Commands.add('getSideDrawerHeader', getSideDrawerHeader);
Cypress.Commands.add('getTable', getTable);
Cypress.Commands.add('getTableCell', getTableCell);
Cypress.Commands.add('getTableHeader', getTableHeader);
Cypress.Commands.add('getTableRow', getTableRow);
Cypress.Commands.add('getTag', getTag);
Cypress.Commands.add('getToolbarFooter', getToolbarFooter);
