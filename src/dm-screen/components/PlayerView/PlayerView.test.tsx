/**
 * @jest-environment jsdom
 */

import '@shopify/react-testing/matchers';
import { mount } from '@shopify/react-testing';

import { PlayerView } from './PlayerView';

import {
  EntityType,
  VisibilityState
} from '@core/types';

import {
  useAdventure,
  useInitiative
} from '../../hooks';
jest.mock('../../hooks', () => ({
  useAdventure: jest.fn(),
  useInitiative: jest.fn()
}));

describe('PlayerView', () => {
  it('should render null when loading', () => {
    // @ts-expect-error This is a Jest mock
    useAdventure.mockImplementation(() => {
      return {
        data: {
          id: '68c8bd92-04ff-4359-9856-8d2d6b02b69b',
          name: 'The Embroidermancer',
          system: 'D&D 5e (2014)'
        },
        isFetching: true,
        isLoading: true,
        isPending: true,
        isSuccess: true
      };
    });

    // @ts-expect-error This is a Jest mock
    useInitiative.mockImplementation(() => {
      return {
        data: null,
        isFetching: true,
        isLoading: true,
        isPending: true,
        isSuccess: true
      };
    })

    const wrapper = mount(
      <PlayerView/>
    );

    expect(wrapper).not.toContainReactText('Out of initiative');
    expect(wrapper).not.toContainReactText('Playing');
    expect(wrapper).not.toContainReactText('On Deck');
  });

  it('should render null when data is null', () => {
    // @ts-expect-error This is a Jest mock
    useAdventure.mockImplementation(() => {
      return {
        data: null,
        isFetching: false,
        isLoading: false,
        isPending: false,
        isSuccess: true
      };
    });

    // @ts-expect-error This is a Jest mock
    useInitiative.mockImplementation(() => {
      return {
        data: null,
        isFetching: false,
        isLoading: false,
        isPending: false,
        isSuccess: true
      };
    })

    const wrapper = mount(
      <PlayerView/>
    );

    expect(wrapper).not.toContainReactText('Out of initiative');
    expect(wrapper).not.toContainReactText('Playing');
    expect(wrapper).not.toContainReactText('On Deck');
  });

  it('should render for a null initiative', () => {
    // @ts-expect-error This is a Jest mock
    useAdventure.mockImplementation(() => {
      return {
        data: {
          id: '68c8bd92-04ff-4359-9856-8d2d6b02b69b',
          name: 'The Embroidermancer',
          system: 'D&D 5e (2014)'
        },
        isFetching: false,
        isLoading: false,
        isPending: false,
        isSuccess: true
      };
    });

    // @ts-expect-error This is a Jest mock
    useInitiative.mockImplementation(() => {
      return {
        data: null,
        isFetching: false,
        isLoading: false,
        isPending: false,
        isSuccess: true
      };
    })

    const wrapper = mount(
      <PlayerView/>
    );

    expect(wrapper).toContainReactText('Out of initiative');
    expect(wrapper).toContainReactText('Playing');
    expect(wrapper).toContainReactText('On Deck');
  });

  it('should render for a blank initiative', () => {
    // @ts-expect-error This is a Jest mock
    useAdventure.mockImplementation(() => {
      return {
        data: {
          id: '68c8bd92-04ff-4359-9856-8d2d6b02b69b',
          name: 'The Embroidermancer',
          system: 'D&D 5e (2014)'
        },
        isFetching: false,
        isLoading: false,
        isPending: false,
        isSuccess: true
      };
    });

    // @ts-expect-error This is a Jest mock
    useInitiative.mockImplementation(() => {
      return {
        data: {
          initiativeOrderState: {
            currentId: '',
            items: [],
            round: 1
          }
        },
        isFetching: false,
        isLoading: false,
        isPending: false,
        isSuccess: true
      };
    })

    const wrapper = mount(
      <PlayerView/>
    );

    expect(wrapper).toContainReactText('Round: 1');
    expect(wrapper).toContainReactText('Playing');
    expect(wrapper).toContainReactText('On Deck');
  });

  it('should render for a full initiative', () => {
    // @ts-expect-error This is a Jest mock
    useAdventure.mockImplementation(() => {
      return {
        data: {
          id: '68c8bd92-04ff-4359-9856-8d2d6b02b69b',
          name: 'The Embroidermancer',
          system: 'D&D 5e (2014)'
        },
        isFetching: false,
        isLoading: false,
        isPending: false,
        isSuccess: true
      };
    });

    // @ts-expect-error This is a Jest mock
    useInitiative.mockImplementation(() => {
      return {
        data: {
          initiativeOrderState: {
            currentId: '1',
            items: [
              {
                id: '1',
                entityId: '2',
                entityType: EntityType.CREATURE,
                name: 'Test A',
                resourceA: 10,
                resourceB: 20,
                sortValue: 15,
                visibilityState: VisibilityState.ON
              },
              {
                id: '2',
                entityId: '2',
                entityType: EntityType.CREATURE,
                name: 'Test B',
                resourceA: 10,
                resourceB: 20,
                sortValue: 15,
                visibilityState: VisibilityState.ON
              }
            ],
            round: 1
          }
        },
        isFetching: false,
        isLoading: false,
        isPending: false,
        isSuccess: true
      };
    })

    const wrapper = mount(
      <PlayerView/>
    );

    expect(wrapper).toContainReactText('Round: 1');
    expect(wrapper).toContainReactText('Playing');
    expect(wrapper).toContainReactText('Test A');
    expect(wrapper).toContainReactText('On Deck');
    expect(wrapper).toContainReactText('Test B');
  });
});