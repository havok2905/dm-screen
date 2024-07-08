/**
 * @jest-environment jsdom
 */

import '@shopify/react-testing/matchers';
import { mount } from '@shopify/react-testing';
import { GridRow } from './GridRow';

describe('GridRow', () => {
  it('should render', () => {
    const wrapper = mount(
      <GridRow>
        Hello, world!
      </GridRow>
    );

    expect(wrapper).toContainReactText('Hello, world!');
  })
});