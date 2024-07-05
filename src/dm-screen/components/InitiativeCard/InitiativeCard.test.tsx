/**
 * @jest-environment jsdom
 */

import '@shopify/react-testing/matchers';
import { mount } from '@shopify/react-testing';

import { InitiativeCard } from './InitiativeCard';

describe('InitiativeCard', () => {
  it('should render', () => {
    const onDoubleClick = jest.fn();
    const onResourceAChange = jest.fn();
    const onResourceBChange = jest.fn();
    const onSortValueChange = jest.fn();

    const wrapper = mount(
      <InitiativeCard
        active={false}
        name="John Doe"
        onDoubleClick={onDoubleClick}
        onResourceAChange={onResourceAChange}
        onResourceBChange={onResourceBChange}
        onSortValueChange={onSortValueChange}
        resourceA={10}
        resourceB={12}
        sortValue={16}
        visibilityState="on"
      />
    );

    const p = wrapper.find('p');

    const resourceA = wrapper.findWhere<'div'>(
      (node) => node.is('div') && node.prop('className') === 'initiative-card-ac',
    )?.find('input');

    const resourceB = wrapper.findWhere<'div'>(
      (node) => node.is('div') && node.prop('className') === 'initiative-card-hp',
    )?.find('input');

    const sortValue = wrapper.findWhere<'div'>(
      (node) => node.is('div') && node.prop('className') === 'initiative-card-initiative-roll',
    )?.find('input');

    expect(resourceA?.props.value).toEqual('10');
    expect(resourceB?.props.value).toEqual('12');
    expect(sortValue?.props.value).toEqual('16');
    expect(p?.text()).toEqual('John Doe');

    resourceA?.trigger('onChange', { target: { value: '1' }});
    resourceB?.trigger('onChange', { target: { value: '2' }});
    sortValue?.trigger('onChange', { target: { value: '3' }});

    expect(onResourceAChange).toHaveBeenCalledTimes(1);
    expect(onResourceBChange).toHaveBeenCalledTimes(1);
    expect(onSortValueChange).toHaveBeenCalledTimes(1);
  });
});
