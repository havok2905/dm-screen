# Standards

## Tool Choice

| Name | Purpose | Reason for Choice |
| ---- | ------- | ----------------- |
| Babel | JavaScript compiler | Vite and Jest don't work well together. This allows TS and JSX handling by jest. |
| Cypress | e2e testing and API testing | Debug tooling is leaps and bounds better than anything present in competition. |
| ESLint | Javascript linter | Enforce code quality and perform static analysis on code |
| Jest | Unit test library | Defacto standard for unit testing |
| React | Javascript view and UI framework | Defacto standard in UI development and handles fine-detailed UI optimizations in a more stateless functional way. |
| @shopify/react-testing | Provide support for testing React components in Jest | Matchers and prop/component detection are far more supportive of true unit tests, as opposed to react testing library. |
| Storybook | React sandbox environment | Build out components in isolation and in a more generic way |
| Typescript | Strongly types object oriented superset of JavaScript | Add type support and advance object oriented language features. |
| Vite | Typescript and asset bundler | Quick build speeds, set up, first class Typescript support, and direct integration with Storybook |

## Directory Structure and File Naming

- src
  - assets
  - components
    - MyComponent ( module named for primary export )
      - MyComponent.ts ( Main export component )
      - MyComponent.stories.ts ( Main export Storybook story )
      - MyComponent.test.ts ( Main export unit tests )
      - MyComponent.css ( Main export styling )
      - MySubComponent.ts ( Private sub component )
      - MyComponent.css ( Private sub component styling )
      - utility.ts ( Private function )
      - index.ts ( exports )

### Naming

1. Files should be named after their primary class/function name
2. File names should use casing of their primary class/function
3. CSS files should share the name of their associated react component
4. Unit tests should share the name of their associated file and contain a `.test` in their file name. `MyComponent.test.ts`

## Styling

### CSS Variables

Design system level styling should capture common values in CSS variables exposed to the rest of the project.

```css
:root {
  --red-50: #FFEBEE;
  --red-100: #FFCDD2;
  --red-200: #EF9A9A;
  --red-300: #E57373;
}
```

```css
.my-component {
  color: var(--red-50);
}
```

### Directory Structure

- src/
  - index.css
  - reset.css
  - App.css
  - components/
    - MyComponent/
      - MyComponent.css

### Naming Classes

`.<component-name>-<sub-area>`

- Class names are always kebab case
- Class names are always lower case
- Class names are always prefixed with a component name to be leveraged as an ad-hoc namespace
- The root level class name should always be the name of the component in kebab-case `.my-component`.
- An inner area that is styles should have a custom suffix. `.my-component-sub-area`.

### Specificity and nesting

- Ids should never be used as selectors, unless we are hooking into third party HTML.
- Selector specificity should be a default of `10`. An exception to this would be attribute level bifurcation, like with input attributes for form fields.
- Nesting classes should be avoided unless absolutely necessary.
- `!important` should be reserved for dealing with third party css that is outside of our control.

### Z Index

ZIndexes should always be captured in a CSS variable and commented. A component's css should never contain a custom z-index value not in a shared and commented variable.

## Typescript and React

### Imports

All imports should be alphabetical, in respect to their import groups.

**Import groups in order:**

```Typescript
// Primary Third Party ( React, classnames )
import classNames from 'classnames';
import React, { useEffect } from 'react';

// Secondary Third Party
import { CoolStuff } from 'cool-stuff';
import { MySdk } from 'my-sdk';
import { ThirdPartyThing } from 'third-party-thing';

// Relative Paths
import { ChildComponent } from './ChildComponent';
import { utility } from './utility';
```

### Keys and Props

Keys and props should be in alphabetical order, unless we are overriding existing keys in new objects.

```Typescript
const foo = {
  coolKey: 'foo',
  myKey: 'foo',
  other: 'foo'
}
```

```Typescript
const Component = ({
  coolProp,
  myProp,
  other
}) => {
  return (
    <ChildComponent
      coolProp={coolProp}
      myProp={myProp}
      other={other}
    />
  );
};
```

```Typescript
const oldFoo = {
  coolKey: 'foo',
  myKey: 'foo',
  other: 'foo'
}

const foo = {
  ...oldFoo,
  coolKey: 'bar'
}
```

### Prop Interfaces

All component props should be associated with a publicly exported interface to define props.

```Typescript
export interface ComponentProps {
  coolProp: string;
  myProp: string;
  other: string;
}

export const Component = ({
  coolProp,
  myProp,
  other
}: ComponentProps) => {
  return (
    <ChildComponent
      coolProp={coolProp}
      myProp={myProp}
      other={other}
    />
  );
};
```

## Testing

### Unit Tests

#### Strategies

**Rails Conf 2013 The Magic Tricks of Testing by Sandi Metz**: https://www.youtube.com/watch?v=URSWYvyc42M

Unit tests should only assert behavior on the following things:

- Function result
- Function result as exception
- Direct public side effects
- Outgoing commands

##### Function Result Example

```Typescript
export const add = (a: number, b: number): number => a + b;
```

```Typescript
import { add } from './add';

describe('add', () => {
  it('should add two numbers', () => {
    const result = add(1, 2);
    expect(result).toEqual(3);
  });
});
```

##### Function Result as Exception Example

```Typescript
export const divide = (a: number, b: number): number => {
  if (b === 0) throw new Error('Cannot divide by zero');
  return a / b;
}
```

```Typescript
import { divide } from './divide';

describe('divide', () => {
  it('should throw an exception for zero', () => {
    expect(() => {
      divide(1, 0);
    }).toThrow('Cannot divide by zero');
  });
});
```

##### Direct Public Side Effects Example

```Typescript
export class MyClass {
  value: string = '';

  setValue(val: string): void {
    this.value = val;
  }
}
```

```Typescript
import { MyClass } from './MyClass';

describe('MyClass', () => {
  describe('setValue', () => {
    it('should set a value', () => {
      const subject = new MyClass();
      const expected = 'foo';

      expect(subject.value).toEqual('');

      subject.setValue(expected);
      expect(subject.value).toEqual(expected);
    });
  });
});
```

##### Outgoing Commands Example and Mocking TypeScript imports

```Typescript
export const saveValue = (value: string): void => {
  if (value) {
    ThirdPartySDK.save(value);
  } else {
    throw new Error('Provide a value!');
  }
}
```

```Typescript
import { saveValue } from './saveValue';
import { ThirdPartySDK } = 'ThirdPartySDK';

describe('saveValue', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should call the API when a value is passed as an argument', () => {
      const spy =
        jest
          .spyOn(ThirdPartySDK, 'save')
          .mockImplementation(jest.fn());

      saveValue('foo');

      expect(spy).toHaveBeenCalled();
  });
});
```

#### React Component Unit Tests

React component unit tests are a bit odd. We would think that the return HTML value of the function is what we want to assert on, like snapshot tests do, but this strategy often introduces severe vector for error in tests.

- A third party UI component could change a class name and incur false negatives without change in behavior.
- Tests are subject to fail for visual design level reasons and not behavioral ones. These test cases are better handled in integration tests with a browser environment.
- We still require a need to test component state and event driven behavior, not covered by the simple return values.
- Outbound calls to other components become much more difficult to reason with, with snapshots.

It's tempting to think of a React component as a simple i/o operation that returns html. But this is missing a huge point. The React library handles the JSX to HTML conversion, meaning asserting on the HTML makes this an integration test. The real return value, for the sake of our unit tests, is JSX prior to HTML generation.

We want to assert on JSX.

We can then modify the testing list above to be the following:

- Function result -> Outbound call to render a react component in a component return
- Function result as exception -> Capture error state UI or error boundary handling
- Direct public side effects -> Does react state render UI as expected
- Outgoing commands -> Stays the same

##### Outbound call to render a react component in a component return

In this example, we are not concerned with that ChildComponent does. That's for that unit test and integration tests to assert on. We only want to check that our call to ChildComponent is correct.

```Typescript
it('It should render child component and pass along props', () => {
  const myComponent = mount(<MyComponent />);

  expect(myComponent).toContainReactComponent('ChildComponent', {
    data: 'foo'
  });
});
```

##### Capture Error State UI and Does React State Render UI as Expected

React components should always have a UI driven behavior to handle runtime exceptions. We want to assert on the UI itself for this.

```Typescript
it('MyComponent handles error', () => {
    const wrapper = mount(<MyComponent/>);

    wrapper.find('button').trigger('onClick');

    expect(wrapper).toContainReactText('An error ocurred');
});
```
