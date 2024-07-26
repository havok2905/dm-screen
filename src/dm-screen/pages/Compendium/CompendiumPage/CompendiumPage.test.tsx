/**
 * @jest-environment jsdom
 */

import '@shopify/react-testing/matchers';
import { MockReactRouterLink } from '@jestHelpers/helpers';
import { mount } from '@shopify/react-testing';

import { CompendiumPage } from './CompendiumPage';

// This needs to be imported for mock behavior in jest.
/* eslint-disable-next-line */
import { Link } from 'react-router-dom';
jest.mock('react-router-dom', () => ({
  Link: MockReactRouterLink
}));


describe('CompendiumPage', () => {
  it('should render', () => {
    const wrapper = mount(
      <CompendiumPage />
    );

    expect(wrapper.find('h1')).toContainReactText('Compendium');
    expect(wrapper.find('a')).toContainReactText('Adventures');
  });
});
