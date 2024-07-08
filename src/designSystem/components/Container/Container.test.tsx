/**
 * @jest-environment jsdom
 */

import '@shopify/react-testing/matchers';
import { mount } from '@shopify/react-testing';

import { Container } from './Container';

describe('Container', () => {
  it('should render', () => {
    const wrapper = mount(
      <Container>
        Hello, world!
      </Container>
    );

    expect(wrapper).toContainReactText('Hello, world!');
  })
});