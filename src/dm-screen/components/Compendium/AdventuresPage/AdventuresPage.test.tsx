/**
 * @jest-environment jsdom
 */
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'

import '@shopify/react-testing/matchers';
import { mount } from '@shopify/react-testing';

import { AdventuresPage } from './AdventuresPage';

// This needs to be imported for mock behavior in jest.
/* eslint-disable-next-line */
import { useNavigate } from 'react-router-dom';
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}));

import { useAdventures } from '../../../hooks';
jest.mock('../../../hooks', () => ({
  useAdventures: jest.fn()
}));

describe('CreaturesTable', () => {
  it('should render', async () => {
    const queryClient = new QueryClient();

    const navigate = jest.fn();

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
        isSuccess: true
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

  it('should show nothing if it is loading', () => {
    const queryClient = new QueryClient();

    // @ts-expect-error This is a Jest mock
    useAdventures.mockImplementation(() => {
      return {
        data: {
          adventures: []
        },
        isFetching: true,
        isLoading: true,
        isPending: true,
        isSuccess: true
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

    // @ts-expect-error This is a Jest mock
    useAdventures.mockImplementation(() => {
      return {
        data: {
          adventures: []
        },
        isFetching: false,
        isLoading: false,
        isPending: false,
        isSuccess: true
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