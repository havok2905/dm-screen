/**
 * @jest-environment jsdom
 */
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'

import '@shopify/react-testing/matchers';
import { MockReactRouterLink } from '@jestHelpers/helpers';
import { mount } from '@shopify/react-testing';

import { AdventuresPage } from './AdventuresPage';

// This needs to be imported for mock behavior in jest.
/* eslint-disable-next-line */
import { Link, useNavigate } from 'react-router-dom';
jest.mock('react-router-dom', () => ({
  Link: MockReactRouterLink,
  useNavigate: jest.fn()
}));

// This needs to be imported for mock behavior in jest.
/* eslint-disable-next-line */
import { useAdventures, useDestroyAdventure } from '../../../hooks';
jest.mock('../../../hooks', () => ({
  useAdventures: jest.fn(),
  useDestroyAdventure: jest.fn()
}));

describe('CreaturesTable', () => {
  it('should render', async () => {
    const queryClient = new QueryClient();

    const navigate = jest.fn();
    const refetch = jest.fn();

    // @ts-expect-error This is a Jest mock
    useNavigate.mockImplementation(() => {
      return navigate;
    });

    // @ts-expect-error This is a Jest mock
    useAdventures.mockImplementation(() => {
      return {
        data: {
          adventures: [
            {
              id: '68c8bd92-04ff-4359-9856-8d2d6b02b69b',
              name: 'The Embroidermancer',
              system: 'D&D 5e (2014)'
            }
          ]
        },
        isFetching: false,
        isLoading: false,
        isPending: false,
        isSuccess: true,
        refetch
      };
    });

    // @ts-expect-error This is a Jest mock
    useDestroyAdventure.mockImplementation(() => {
      return {
        mutate: jest.fn()
      };
    });

    const wrapper = mount(
      <QueryClientProvider client={queryClient}>
        <AdventuresPage />
      </QueryClientProvider>
    );

    const rows = wrapper.findAll('tr');
    const firstRow = rows[0];
    const secondRow = rows[1];

    const firstRowCells = firstRow.findAll('th');
    const secondRowCells = secondRow.findAll('td');

    expect(firstRowCells[0]).toContainReactText('Id');
    expect(firstRowCells[1]).toContainReactText('Name');
    expect(firstRowCells[2]).toContainReactText('System');

    expect(secondRowCells[0]).toContainReactText('68c8bd92-04ff-4359-9856-8d2d6b02b69b');
    expect(secondRowCells[1]).toContainReactText('The Embroidermancer');
    expect(secondRowCells[2]).toContainReactText('D&D 5e (2014)');

    const viewButton = secondRowCells[3].find('button');
    
    viewButton?.trigger('onClick');

    expect(navigate).toHaveBeenCalledTimes(1);
  });

  it('should destroy an adventure', async () => {
    const queryClient = new QueryClient();

    const navigate = jest.fn();
    const refetch = jest.fn();

    // @ts-expect-error This is a Jest mock
    useNavigate.mockImplementation(() => {
      return navigate;
    });

    // @ts-expect-error This is a Jest mock
    useAdventures.mockImplementation(() => {
      return {
        data: {
          adventures: [
            {
              id: '68c8bd92-04ff-4359-9856-8d2d6b02b69b',
              name: 'The Embroidermancer',
              system: 'D&D 5e (2014)'
            }
          ]
        },
        isFetching: false,
        isLoading: false,
        isPending: false,
        isSuccess: true,
        refetch
      };
    });

    // @ts-expect-error This is a Jest mock
    useDestroyAdventure.mockImplementation((onSuccess: () => void) => {
      return {
        mutate: jest.fn().mockImplementation(() => {
          if(onSuccess) {
            onSuccess();
          }
        })
      };
    });

    const wrapper = mount(
      <QueryClientProvider client={queryClient}>
        <AdventuresPage />
      </QueryClientProvider>
    );

    const destroyButton = wrapper.findAll('button')[2];
    
    destroyButton.trigger('onClick');

    const modal = wrapper.findWhere<'div'>(
      (node) => node.is('div') && node.prop('className') === 'dm-screen-design-system-modal',
    );

    const yesButton = modal?.findAll('button')[0];
    
    yesButton?.trigger('onClick');

    expect(refetch).toHaveBeenCalledTimes(1);

    const modalAfter = wrapper.findWhere<'div'>(
      (node) => node.is('div') && node.prop('className') === 'dm-screen-design-system-modal',
    );

    expect(modalAfter?.html()).toBeFalsy();
  });

  it('should try to destroy an adventure and cancel', async () => {
    const queryClient = new QueryClient();

    const navigate = jest.fn();
    const refetch = jest.fn();

    // @ts-expect-error This is a Jest mock
    useNavigate.mockImplementation(() => {
      return navigate;
    });

    // @ts-expect-error This is a Jest mock
    useAdventures.mockImplementation(() => {
      return {
        data: {
          adventures: [
            {
              id: '68c8bd92-04ff-4359-9856-8d2d6b02b69b',
              name: 'The Embroidermancer',
              system: 'D&D 5e (2014)'
            }
          ]
        },
        isFetching: false,
        isLoading: false,
        isPending: false,
        isSuccess: true,
        refetch
      };
    });

    // @ts-expect-error This is a Jest mock
    useDestroyAdventure.mockImplementation((onSuccess: () => void) => {
      return {
        mutate: jest.fn().mockImplementation(() => {
          if(onSuccess) {
            onSuccess();
          }
        })
      };
    });

    const wrapper = mount(
      <QueryClientProvider client={queryClient}>
        <AdventuresPage />
      </QueryClientProvider>
    );

    const destroyButton = wrapper.findAll('button')[1];
    
    destroyButton.trigger('onClick');

    const modal = wrapper.findWhere<'div'>(
      (node) => node.is('div') && node.prop('className') === 'dm-screen-design-system-modal',
    );

    const cancelButton = modal?.findAll('button')[1];
    
    cancelButton?.trigger('onClick');

    expect(refetch).toHaveBeenCalledTimes(0);

    const modalAfter = wrapper.findWhere<'div'>(
      (node) => node.is('div') && node.prop('className') === 'dm-screen-design-system-modal',
    );

    expect(modalAfter?.html()).toBeFalsy();
  });

  it('should view an adventure', async () => {
    const queryClient = new QueryClient();

    const navigate = jest.fn();
    const refetch = jest.fn();

    // @ts-expect-error This is a Jest mock
    useNavigate.mockImplementation(() => {
      return navigate;
    });

    // @ts-expect-error This is a Jest mock
    useAdventures.mockImplementation(() => {
      return {
        data: {
          adventures: [
            {
              id: '68c8bd92-04ff-4359-9856-8d2d6b02b69b',
              name: 'The Embroidermancer',
              system: 'D&D 5e (2014)'
            }
          ]
        },
        isFetching: false,
        isLoading: false,
        isPending: false,
        isSuccess: true,
        refetch
      };
    });

    // @ts-expect-error This is a Jest mock
    useDestroyAdventure.mockImplementation(() => {
      return {
        mutate: jest.fn()
      };
    });

    const wrapper = mount(
      <QueryClientProvider client={queryClient}>
        <AdventuresPage />
      </QueryClientProvider>
    );

    const viewButton = wrapper.findAll('button')[0];
    
    viewButton.trigger('onClick');

    expect(navigate).toHaveBeenCalledTimes(1);
  });

  it('should edit an adventure', async () => {
    const queryClient = new QueryClient();

    const navigate = jest.fn();
    const refetch = jest.fn();

    // @ts-expect-error This is a Jest mock
    useNavigate.mockImplementation(() => {
      return navigate;
    });

    // @ts-expect-error This is a Jest mock
    useAdventures.mockImplementation(() => {
      return {
        data: {
          adventures: [
            {
              id: '68c8bd92-04ff-4359-9856-8d2d6b02b69b',
              name: 'The Embroidermancer',
              system: 'D&D 5e (2014)'
            }
          ]
        },
        isFetching: false,
        isLoading: false,
        isPending: false,
        isSuccess: true,
        refetch
      };
    });

    // @ts-expect-error This is a Jest mock
    useDestroyAdventure.mockImplementation(() => {
      return {
        mutate: jest.fn()
      };
    });

    const wrapper = mount(
      <QueryClientProvider client={queryClient}>
        <AdventuresPage />
      </QueryClientProvider>
    );

    const viewButton = wrapper.findAll('button')[1];
    
    viewButton.trigger('onClick');

    expect(navigate).toHaveBeenCalledTimes(1);
  });

  it('should show nothing if it is loading', () => {
    const queryClient = new QueryClient();

    const refetch = jest.fn();

    // @ts-expect-error This is a Jest mock
    useAdventures.mockImplementation(() => {
      return {
        data: {
          adventures: []
        },
        isFetching: true,
        isLoading: true,
        isPending: true,
        isSuccess: true,
        refetch
      };
    });

    // @ts-expect-error This is a Jest mock
    useDestroyAdventure.mockImplementation(() => {
      return {
        mutate: jest.fn()
      };
    });

    const wrapper = mount(
      <QueryClientProvider client={queryClient}>
        <AdventuresPage />
      </QueryClientProvider>
    );

    const table = wrapper.find('table');

    expect(table).toBeFalsy();
    expect(wrapper).not.toContainReactText('No adventures were found');
  });

  it('should show an empty result', () => {
    const queryClient = new QueryClient();

    const refetch = jest.fn();

    // @ts-expect-error This is a Jest mock
    useAdventures.mockImplementation(() => {
      return {
        data: {
          adventures: []
        },
        isFetching: false,
        isLoading: false,
        isPending: false,
        isSuccess: true,
        refetch
      };
    });

    // @ts-expect-error This is a Jest mock
    useDestroyAdventure.mockImplementation(() => {
      return {
        mutate: jest.fn()
      };
    });

    const wrapper = mount(
      <QueryClientProvider client={queryClient}>
        <AdventuresPage />
      </QueryClientProvider>
    );

    const table = wrapper.find('table');

    expect(table).toBeFalsy();
    expect(wrapper).toContainReactText('No adventures were found');
  });
});