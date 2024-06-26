/**
 * @jest-environment jsdom
 */

import '@shopify/react-testing/matchers';
import { mount } from '@shopify/react-testing';
import { Item } from './Item';

describe('Button', () => {
  it('should render', () => {
    const wrapper = mount(
      <Item columns={1}>
        Hello, world!
      </Item>
    );

    const div = wrapper.find('div');

    expect(div?.props?.className?.includes('dm-screen-design-system-item-1')).toEqual(true);
    expect(wrapper).toContainReactText('Hello, world!');
  });
});