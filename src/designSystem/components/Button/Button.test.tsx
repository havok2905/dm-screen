/**
 * @jest-environment jsdom
 */

import { mount } from '@shopify/react-testing';
import { Button } from './Button';

describe('Button', () => {
  it('should render', () => {
    const wrapper = mount(
      <Button buttonText="Click me" />
    );

    expect(wrapper.text()).toEqual('Click me');
  });
});
