/**
 * @jest-environment jsdom
 */

import { mount } from '@shopify/react-testing';

import { InitiativeCard } from './InitiativeCard';

describe('InitiativeCard', () => {
  it('should render', () => {
    const wrapper = mount(
      <InitiativeCard
        ac={10}
        characterName="John Doe"
        hp={12}
        initiativeRoll={16}
      />
    );

    const p = wrapper.find('p');

    const ac = wrapper.findWhere<'div'>(
      (node) => node.is('div') && node.prop('className') === 'initiative-card-ac',
    )?.find('input');

    const hp = wrapper.findWhere<'div'>(
      (node) => node.is('div') && node.prop('className') === 'initiative-card-hp',
    )?.find('input');

    const initiativeRoll = wrapper.findWhere<'div'>(
      (node) => node.is('div') && node.prop('className') === 'initiative-card-initiative-roll',
    )?.find('input');

    expect(ac?.props.value).toEqual('10');
    expect(hp?.props.value).toEqual('12');
    expect(initiativeRoll?.props.value).toEqual('16');
    expect(p?.text()).toEqual('John Doe');
  });
});
