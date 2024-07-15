/**
 * @jest-environment jsdom
 */

import '@shopify/react-testing/matchers';
import { mount } from '@shopify/react-testing';

import {
  EntityType,
  VisibilityState
} from '@core/types';

import { MountInitiativeOrder } from '@jestHelpers/helpers';

import { InitiativeOrderComponent } from './InitiativeOrderComponent';
import { InitiativeOrderContextProvider } from '../InitiativeOrderContext';

describe('InitiativeOrderComponent', () => {
  it('renders as DM', () => {
    const handleBootstrapInitiativeOrder = jest.fn();
    const handleDestroyInitiativeOrder = jest.fn();
    const handleUpdateInitiativeOrder = jest.fn();

    const wrapper = mount(
      <InitiativeOrderComponent
        creatures={[]}
        handleBootstrapInitiativeOrder={handleBootstrapInitiativeOrder}
        handleDestroyInitiativeOrder={handleDestroyInitiativeOrder}
        handleUpdateInitiativeOrder={handleUpdateInitiativeOrder}
        initiativeOrderState={{
          currentId: '',
          items: [],
          round: 1
        }}
        playerView={false}
      />  
    );

    const buttons = wrapper.findAll('button');
    const p = wrapper.find('p');

    expect(buttons[0]).toContainReactText('Prev');
    expect(buttons[1]).toContainReactText('Next');
    expect(buttons[2]).toContainReactText('Sort');
    expect(buttons[3]).toContainReactText('End Combat');

    expect(p).toContainReactText('Round: 1');
  });

  it('renders as DM with no initiativeState', () => {
    const handleBootstrapInitiativeOrder = jest.fn();
    const handleDestroyInitiativeOrder = jest.fn();
    const handleUpdateInitiativeOrder = jest.fn();

    const wrapper = mount(
      <InitiativeOrderComponent
        creatures={[]}
        handleBootstrapInitiativeOrder={handleBootstrapInitiativeOrder}
        handleDestroyInitiativeOrder={handleDestroyInitiativeOrder}
        handleUpdateInitiativeOrder={handleUpdateInitiativeOrder}
        initiativeOrderState={null}
        playerView={false}
      />  
    );

    const buttons = wrapper.findAll('button');
    const p = wrapper.find('p');

    expect(buttons[0]).toContainReactText('Prev');
    expect(buttons[1]).toContainReactText('Next');
    expect(buttons[2]).toContainReactText('Sort');
    expect(buttons[3]).toContainReactText('Bootstrap Combat');

    expect(p).toContainReactText('Out of initiative');
  });

  it('bootstraps initiative', () => {
    const handleBootstrapInitiativeOrder = jest.fn();
    const handleDestroyInitiativeOrder = jest.fn();
    const handleUpdateInitiativeOrder = jest.fn();

    const wrapper = mount(
      <InitiativeOrderComponent
        creatures={[]}
        handleBootstrapInitiativeOrder={handleBootstrapInitiativeOrder}
        handleDestroyInitiativeOrder={handleDestroyInitiativeOrder}
        handleUpdateInitiativeOrder={handleUpdateInitiativeOrder}
        initiativeOrderState={null}
        playerView={false}
      />  
    );

    const buttons = wrapper.findAll('button');

    buttons[3].trigger('onClick');

    expect(handleBootstrapInitiativeOrder).toHaveBeenCalledTimes(1);
  });

  it('removes initiative', () => {
    const handleBootstrapInitiativeOrder = jest.fn();
    const handleDestroyInitiativeOrder = jest.fn();
    const handleUpdateInitiativeOrder = jest.fn();

    const wrapper = mount(
      <InitiativeOrderComponent
        creatures={[]}
        handleBootstrapInitiativeOrder={handleBootstrapInitiativeOrder}
        handleDestroyInitiativeOrder={handleDestroyInitiativeOrder}
        handleUpdateInitiativeOrder={handleUpdateInitiativeOrder}
        initiativeOrderState={{
          currentId: '',
          items: [],
          round: 1
        }}
        playerView={false}
      />  
    );

    const buttons = wrapper.findAll('button');

    buttons[3].trigger('onClick');

    expect(handleDestroyInitiativeOrder).toHaveBeenCalledTimes(1);
  });

  it('renders as Player', () => {
    const handleBootstrapInitiativeOrder = jest.fn();
    const handleDestroyInitiativeOrder = jest.fn();
    const handleUpdateInitiativeOrder = jest.fn();

    const wrapper = mount(
      <InitiativeOrderComponent
        creatures={[]}
        handleBootstrapInitiativeOrder={handleBootstrapInitiativeOrder}
        handleDestroyInitiativeOrder={handleDestroyInitiativeOrder}
        handleUpdateInitiativeOrder={handleUpdateInitiativeOrder}
        initiativeOrderState={{
          currentId: '',
          items: [],
          round: 1
        }}
        playerView={true}
      />  
    );

    const buttons = wrapper.findAll('button');
    const p = wrapper.find('p');

    expect(buttons[0]).toBeFalsy();
    expect(buttons[1]).toBeFalsy();
    expect(buttons[2]).toBeFalsy();
    expect(buttons[3]).toBeFalsy();

    expect(p).toContainReactText('Round: 1');
  });

  it('displays an initiative item', () => {
    const handleBootstrapInitiativeOrder = jest.fn();
    const handleDestroyInitiativeOrder = jest.fn();
    const handleUpdateInitiativeOrder = jest.fn();

    const wrapper = mount(
      <InitiativeOrderComponent
        creatures={[
          {
            id: '1',
            content: '',
            image: '/',
            metadata: [],
            name: 'Test'
          }
        ]}
        handleBootstrapInitiativeOrder={handleBootstrapInitiativeOrder}
        handleDestroyInitiativeOrder={handleDestroyInitiativeOrder}
        handleUpdateInitiativeOrder={handleUpdateInitiativeOrder}
        initiativeOrderState={{
          currentId: '',
          items: [
            {
              id: '1',
              entityId: '2',
              entityType: EntityType.CREATURE,
              name: 'Test',
              resourceA: 10,
              resourceB: 20,
              sortValue: 15,
              visibilityState: VisibilityState.ON
            }
          ],
          round: 1
        }}
        playerView={true}
      />  
    );

    const cards = wrapper.findAllWhere<'div'>(
      (node) => node.is('div') && node.prop('className') === 'initiative-card',
    );

    expect(cards?.length).toEqual(1);
  });

  it('moves next', () => {
    const handleBootstrapInitiativeOrder = jest.fn();
    const handleDestroyInitiativeOrder = jest.fn();
    const handleUpdateInitiativeOrder = jest.fn();

    const initiativeOrderState = {
      currentId: '',
      items: [
        {
          id: '1',
          entityId: '2',
          entityType: EntityType.CREATURE,
          name: 'Test',
          resourceA: 10,
          resourceB: 20,
          sortValue: 15,
          visibilityState: VisibilityState.ON
        }
      ],
      round: 1
    };

    const wrapper = mount(
      <InitiativeOrderContextProvider>
        <MountInitiativeOrder
          initiativeOrderState={initiativeOrderState}>
          <InitiativeOrderComponent
            creatures={[
              {
                id: '1',
                content: '',
                image: '/',
                metadata: [],
                name: 'Test'
              }
            ]}
            handleBootstrapInitiativeOrder={handleBootstrapInitiativeOrder}
            handleDestroyInitiativeOrder={handleDestroyInitiativeOrder}
            handleUpdateInitiativeOrder={handleUpdateInitiativeOrder}
            initiativeOrderState={initiativeOrderState}
            playerView={false}
          />
        </MountInitiativeOrder>
      </InitiativeOrderContextProvider>
    );

    const buttons = wrapper.findAll('button');

    buttons[2].trigger('onClick');
    buttons[1].trigger('onClick');

    expect(handleUpdateInitiativeOrder).toHaveBeenCalledTimes(2);
  });

  it('moves prev', () => {
    const handleBootstrapInitiativeOrder = jest.fn();
    const handleDestroyInitiativeOrder = jest.fn();
    const handleUpdateInitiativeOrder = jest.fn();

    const initiativeOrderState = {
      currentId: '',
      items: [
        {
          id: '1',
          entityId: '2',
          entityType: EntityType.CREATURE,
          name: 'Test',
          resourceA: 10,
          resourceB: 20,
          sortValue: 15,
          visibilityState: VisibilityState.ON
        }
      ],
      round: 1
    };

    const wrapper = mount(
      <InitiativeOrderContextProvider>
        <MountInitiativeOrder
          initiativeOrderState={initiativeOrderState}>
          <InitiativeOrderComponent
            creatures={[
              {
                id: '1',
                content: '',
                image: '/',
                metadata: [],
                name: 'Test'
              }
            ]}
            handleBootstrapInitiativeOrder={handleBootstrapInitiativeOrder}
            handleDestroyInitiativeOrder={handleDestroyInitiativeOrder}
            handleUpdateInitiativeOrder={handleUpdateInitiativeOrder}
            initiativeOrderState={initiativeOrderState}
            playerView={false}
          />
        </MountInitiativeOrder>
      </InitiativeOrderContextProvider>
    );

    const buttons = wrapper.findAll('button');

    buttons[2].trigger('onClick');
    buttons[0].trigger('onClick');

    expect(handleUpdateInitiativeOrder).toHaveBeenCalledTimes(2);
  });
});