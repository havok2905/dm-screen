/**
 * @jest-environment jsdom
 */

import '@shopify/react-testing/matchers';
import { mount } from '@shopify/react-testing';

import { InitiativeOrderDmNavControls } from './InitiativeOrderDmNavControls';

describe('InitiativeOrderDmNavControls', () => {
  it('should render', () => {
    const next = jest.fn();
    const prev = jest.fn();
    const sort = jest.fn();

    const wrapper = mount(
      <InitiativeOrderDmNavControls
        isDisabled={false}
        isPlayer={false}
        next={next}
        prev={prev}
        sort={sort}
      />
    );

    const buttons = wrapper.findAll('button');

    buttons[0].trigger('onClick');
    buttons[1].trigger('onClick');
    buttons[2].trigger('onClick');

    expect(next).toHaveBeenCalledTimes(1);
    expect(prev).toHaveBeenCalledTimes(1);
    expect(sort).toHaveBeenCalledTimes(1);
  });

  it('should render disabled', () => {
    const next = jest.fn();
    const prev = jest.fn();
    const sort = jest.fn();

    const wrapper = mount(
      <InitiativeOrderDmNavControls
        isDisabled
        isPlayer={false}
        next={next}
        prev={prev}
        sort={sort}
      />
    );

    const buttons = wrapper.findAll('button');

    expect(buttons[0].props.disabled).toEqual(true);
    expect(buttons[1].props.disabled).toEqual(true);
    expect(buttons[2].props.disabled).toEqual(true);
  });

  it('should render null when it is a player', () => {
    const next = jest.fn();
    const prev = jest.fn();
    const sort = jest.fn();

    const wrapper = mount(
      <InitiativeOrderDmNavControls
        isDisabled={false}
        isPlayer
        next={next}
        prev={prev}
        sort={sort}
      />
    );

    expect(wrapper).toContainReactHtml('');
    expect(next).toHaveBeenCalledTimes(0);
    expect(prev).toHaveBeenCalledTimes(0);
    expect(sort).toHaveBeenCalledTimes(0);
  });

  it('should trigger prev onClick', () => {
    const next = jest.fn();
    const prev = jest.fn();
    const sort = jest.fn();

    const wrapper = mount(
      <InitiativeOrderDmNavControls
        isDisabled={false}
        isPlayer={false}
        next={next}
        prev={prev}
        sort={sort}
      />
    );

    const prevButton = wrapper.findAll('button')[0];

    prevButton.trigger('onClick');

    expect(next).toHaveBeenCalledTimes(0);
    expect(prev).toHaveBeenCalledTimes(1);
    expect(sort).toHaveBeenCalledTimes(0);
  });

  it('should trigger prev onKeyDown', () => {
    const next = jest.fn();
    const prev = jest.fn();
    const sort = jest.fn();

    const wrapper = mount(
      <InitiativeOrderDmNavControls
        isDisabled={false}
        isPlayer={false}
        next={next}
        prev={prev}
        sort={sort}
      />
    );

    const prevButton = wrapper.findAll('button')[0];

    prevButton.trigger('onKeyDown', {
      key: 'Enter'
    });

    expect(next).toHaveBeenCalledTimes(0);
    expect(prev).toHaveBeenCalledTimes(1);
    expect(sort).toHaveBeenCalledTimes(0);
  });

  it('should trigger next onClick', () => {
    const next = jest.fn();
    const prev = jest.fn();
    const sort = jest.fn();

    const wrapper = mount(
      <InitiativeOrderDmNavControls
        isDisabled={false}
        isPlayer={false}
        next={next}
        prev={prev}
        sort={sort}
      />
    );

    const nextButton = wrapper.findAll('button')[1];

    nextButton.trigger('onClick');

    expect(next).toHaveBeenCalledTimes(1);
    expect(prev).toHaveBeenCalledTimes(0);
    expect(sort).toHaveBeenCalledTimes(0);
  });

  it('should trigger next onKeyDown', () => {
    const next = jest.fn();
    const prev = jest.fn();
    const sort = jest.fn();

    const wrapper = mount(
      <InitiativeOrderDmNavControls
        isDisabled={false}
        isPlayer={false}
        next={next}
        prev={prev}
        sort={sort}
      />
    );

    const nextButton = wrapper.findAll('button')[1];

    nextButton.trigger('onKeyDown', {
      key: 'Enter'
    });

    expect(next).toHaveBeenCalledTimes(1);
    expect(prev).toHaveBeenCalledTimes(0);
    expect(sort).toHaveBeenCalledTimes(0);
  });

  it('should trigger sort onClick', () => {
    const next = jest.fn();
    const prev = jest.fn();
    const sort = jest.fn();

    const wrapper = mount(
      <InitiativeOrderDmNavControls
        isDisabled={false}
        isPlayer={false}
        next={next}
        prev={prev}
        sort={sort}
      />
    );

    const sortButton = wrapper.findAll('button')[2];

    sortButton.trigger('onClick');

    expect(next).toHaveBeenCalledTimes(0);
    expect(prev).toHaveBeenCalledTimes(0);
    expect(sort).toHaveBeenCalledTimes(1);
  });

  it('should trigger sort onKeyDown', () => {
    const next = jest.fn();
    const prev = jest.fn();
    const sort = jest.fn();

    const wrapper = mount(
      <InitiativeOrderDmNavControls
        isDisabled={false}
        isPlayer={false}
        next={next}
        prev={prev}
        sort={sort}
      />
    );

    const sortButton = wrapper.findAll('button')[2];

    sortButton.trigger('onKeyDown', {
      key: 'Enter'
    });

    expect(next).toHaveBeenCalledTimes(0);
    expect(prev).toHaveBeenCalledTimes(0);
    expect(sort).toHaveBeenCalledTimes(1);
  });
});