/**
 * @jest-environment jsdom
 */

import '@shopify/react-testing/matchers';
import { mount } from '@shopify/react-testing';

import { Grid } from './Grid';

describe('Grid', () => {
  it('should render', () => {
    const wrapper = mount(
      <Grid>
        Hello, world!
      </Grid>
    );

    expect(wrapper).toContainReactText('Hello, world!');
  })
});