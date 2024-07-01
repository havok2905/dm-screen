/**
 * @jest-environment jsdom
 */

import '@shopify/react-testing/matchers';
import { mount } from '@shopify/react-testing';

import { Markdown } from './Markdown';

describe('Markdown', () => {
  it('should render', () => {
    const markdown = `
# Header One

Hello, world!
`;

    const wrapper = mount(
      <Markdown content={markdown}/>
    );

    expect(wrapper).toContainReactHtml('<h1>Header One</h1>');
    expect(wrapper).toContainReactHtml('<p>Hello, world!</p>');
  });
});
