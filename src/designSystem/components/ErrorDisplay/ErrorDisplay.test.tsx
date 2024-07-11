/**
 * @jest-environment jsdom
 */

import '@shopify/react-testing/matchers';
import { mount } from '@shopify/react-testing';

import { ErrorDisplay } from "./ErrorDisplay";

describe('ErrorDisplay', () => {
  it('should render', () => {
    const wrapper = mount(
      <ErrorDisplay
        errorTitle="A test error ocurred"
        message="Lorem ipsum dolor"
      />
    );

    expect(wrapper.find('h2')).toContainReactText('A test error ocurred');
    expect(wrapper.find('p')).toContainReactText('Lorem ipsum dolor');
  });

  it('should render a default title', () => {
    const wrapper = mount(
      <ErrorDisplay
        message="Lorem ipsum dolor"
      />
    );

    expect(wrapper.find('h2')).toContainReactText('An error ocurred');
    expect(wrapper.find('p')).toContainReactText('Lorem ipsum dolor');
  });

  it('should not render markup for a missing message', () => {
    const wrapper = mount(
      <ErrorDisplay />
    );

    expect(wrapper.find('h2')).toContainReactText('An error ocurred');
    expect(wrapper.find('p')).toBeFalsy();
  });
});