# Testing Strategy

Testing in this application can be broken down into a few key parts:

1. **Cypress component tests:** Handle happy path page level UX
2. **Jest unit tests:** Handle core business logic
3. **Storybook:** Verify and iterate on design system style and UX

## Reasoning

This project is going to grow rapidly with a limited amount of people contributing, with an even more limited amount of contribution time per week. While it would be ideal to have a full suite of unit and e2e tests, this is not viable for a hobby project of two people.

Instead, we want to maximize the the area of the code that we test with the fewest amount of tests physically written, while still proving that the app's core functionality works.

An emphasis on Cypress testing ensures that the core functionality of the product works. Or, put another way, does the app provide value to an end user? Unit testing business logic ensures that we don't flood the project with too many slow and redundant component tests where we do not need them. Storybook ensures we still have some eyes on design system level code and that it doesn't get entirely neglected. This does allow for some vector for error, but Storybook should provide an environment to resolve those issues quickly.

## Storybook

Storybook stories should be restricted to design system level components and simple page specific components. The main use-case here is stylistic verification and quick iteration on new approaches to UX. Unit testing really doesn't help here and we can trust that page level Cypress tests will exercise at least some of this functionality later at a happy path level.

**Example Storybook Story**

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'DesignSystem/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    buttonText: { control: 'text' }
  },
  args: {

  }
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    buttonText: 'Button'
  }
};
```

## Jest

Jest unit tests should cover stand alone functions that cannot be covered by either storybook or Cypress. These tests cover more complicated business logic that would be cumbersome to test in Cypress component tests.

For example: we don't need to test the UI for every use-case of a dice roller. The UI only needs to accept a /roll command and spit out a number we expect. The business logic for that dice roller however should be extensively covered by a unit test.

**Example Cypress Test**

```typescript
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
```

**Example Jest Test**

```typescript
it('should handle a /roll command', () => { ... });

it('should handle a /roll command with a minus', () => { ... });

it('should handle a /roll command with no addition', () => { ... });

it('should handle a malformed command', () => { ... });

it('should handle an absent command', () => { ... });

// more edge cases
```

## Cypress

Cypress component tests should accompany each page in the app. Specifically we use component tests vs e2e tests to avoid the problem of needed to mock database environments and to simplify execution, for what is basically a hobby project.

- We can largely trust that React Router and paths work for this project.
- The backend has its own suite of tests and as long as the contracts remain the same between frontend and backend, that should be enough for most of our use cases.
- Component tests largely allow us to ignore the need for rolling back transactions, managing multiple db environments and infrastructure, and database cleanup.

### Cypress Commands

Cypress allows for the creation of helper functions to make tests more readable when querying the dom. We should only make these functions for components that we expect to reuse across multiple tests.

These commands should also be simple and single-use. We want to avoid opinionated helper functions so we don't end up with 4 iterations of:

- getButton()
- getButtonByIndex()
- getButtonAndClick()
- getSecondButtonAndClick()

The test should be deciding how to best orchestrate these helper functions instead of shoving test functionality in the helpers.

For example, this is a simple command for retrieving a button and its use in a test.

**/cypress/support/commands.ts**

```typescript
const getButton = () => {
  return cy.get('[data-test-id="dm-screen-design-system-button"]');
};

type ChainableElement = Cypress.Chainable<JQuery<HTMLElement>>;


declare namespace Cypress {
  interface Chainable {
    getButton(): ChainableElement
  }
}

Cypress.Commands.add('getButton', getButton);
```

**Example Test**

```typescript
/**
 * Fetch the 2nd button on the page.
 * Verify its text and that it is disabled.
 */
cy
  .getButton()
  .eq(3)
  .should('contain', 'Add all to combat')
  .should('be.disabled');
```

### Test Ids

When possible, we should almost always query on a `data-test-id` attribute added to an HTML element. Class names are often complicated, flaky, and subject to change. While these attributes may overlap with class names, creating a `data-test-id` attribute future proofs the tests and decouples the tests from the styling of the app.

The example in the prior section illustrates this.

### Stubbing Values

We often need to test around function calls that give unreliable values, such as with `Math.Random()`. Cypress allows us to stub these values like so.

```typescript
cy
  .stub(Math, 'random')
  .returns(0.5);
```

This ensures that the result of calling `Math.random()` will always be `0.5` for our test.

### Handling API Calls

Our tests should intercept outbound API calls and provide mock responses. There is a lot of leeway in how to do this, but a recommended path would be the following:

1. Create a new directory with the name of the page at `/cypress/fixtures/pages/MyPage`
2. Create a new directory under that for the named for the React hook making the api call. For example: `/cypress/fixtures/pages/DmView/useAdventure`
3. Create a new json file names for the first argument in the outbound payload. This could be an id, string, etc. For example: `/cypress/fixtures/pages/DmView/useAdventure/68c8bd92-04ff-4359-9856-8d2d6b02b69b.json`. Add the response json to that file.

In the `beforeEach` block of the cypress test, you can then write the following:

```typescript
cy.intercept('GET', `${TEST_API_BASE}/adventure/${TEST_ADVENTURE_ID}`, {
  statusCode: 200,
  fixture: `pages/DmView/useAdventure/${TEST_ADVENTURE_ID}`
});
```

This will intercept the API call and give your fixture data as a response.

