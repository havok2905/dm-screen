/**
 * @jest-environment jsdom
 */

import '@shopify/react-testing/matchers';
import { mount } from '@shopify/react-testing';

import { InitiativeOrderDmControls } from './InitiativeOrderDmControls';

describe('InitiativeOrderDmControls', () => {
  it('should render', () => {
    const handleBootstrapInitiativeClick = jest.fn();
    const handleRemoveInitiativeClick = jest.fn();

    const wrapper = mount(
      <InitiativeOrderDmControls
        handleBootstrapInitiativeClick={handleBootstrapInitiativeClick}
        handleRemoveInitiativeClick={handleRemoveInitiativeClick}
        inInCombat={false}
        isPlayer={false}
      />
    );

    const buttons = wrapper.findAll('button');

    buttons[0].trigger('onClick');

    expect(handleBootstrapInitiativeClick).toHaveBeenCalledTimes(1);
    expect(handleRemoveInitiativeClick).toHaveBeenCalledTimes(0);
  });

  it('should render in combat', () => {
    const handleBootstrapInitiativeClick = jest.fn();
    const handleRemoveInitiativeClick = jest.fn();

    const wrapper = mount(
      <InitiativeOrderDmControls
        handleBootstrapInitiativeClick={handleBootstrapInitiativeClick}
        handleRemoveInitiativeClick={handleRemoveInitiativeClick}
        inInCombat={true}
        isPlayer={false}
      />
    );

    const buttons = wrapper.findAll('button');

    buttons[0].trigger('onClick');

    expect(handleBootstrapInitiativeClick).toHaveBeenCalledTimes(0);
    expect(handleRemoveInitiativeClick).toHaveBeenCalledTimes(1);
  });


  it('should render null when it is a player', () => {
    const handleBootstrapInitiativeClick = jest.fn();
    const handleRemoveInitiativeClick = jest.fn();

    const wrapper = mount(
      <InitiativeOrderDmControls
        handleBootstrapInitiativeClick={handleBootstrapInitiativeClick}
        handleRemoveInitiativeClick={handleRemoveInitiativeClick}
        isPlayer
      />
    );

    expect(wrapper).toContainReactHtml('');
    expect(handleRemoveInitiativeClick).toHaveBeenCalledTimes(0);
    expect(handleRemoveInitiativeClick).toHaveBeenCalledTimes(0);
  });
});