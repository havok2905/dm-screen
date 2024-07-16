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

import { AdventurePage } from './AdventurePage';

// This needs to be imported for mock behavior in jest.
/* eslint-disable-next-line */
import { Link } from 'react-router-dom';
jest.mock('react-router-dom', () => ({
  Link: MockReactRouterLink
}));

import { useAdventure } from '../../../hooks';
jest.mock('../../../hooks', () => ({
  useAdventure: jest.fn()
}));

describe('AdventurePage', () => {
  it('should render', () => {
    const queryClient = new QueryClient();

    // @ts-expect-error This is a Jest mock
    useAdventure.mockImplementation(() => {
      return {
        data: {
          creatures: [
            {
              id: '2',
              name: 'Test Creature'
            }
          ],
          handouts: [
            {
              description: 'image description',
              id: '4',
              name: 'Test Image',
              url: '/'
            }
          ],
          id: '1',
          items: [
            {
              id: '3',
              name: 'Test Item'
            }
          ],
          name: 'Test Adventure',
          notes: `# Hello, world!

Lorem ipsum
`,
          system: 'Test System',

        },
        isFetching: false,
        isLoading: false,
        isPending: false,
        isSuccess: true
      };
    });

    const wrapper = mount(
      <QueryClientProvider client={queryClient}>
        <AdventurePage />
      </QueryClientProvider>
    );

    const tables = wrapper.findAll('table');

    const creatureTable = tables[0];
    const itemTable = tables[1];
    const image = wrapper.find('img');

    expect(wrapper).toContainReactText('Compendium');
    expect(wrapper).toContainReactText('Back to Adventures');
    expect(wrapper).toContainReactText('Test Adventure');
    expect(wrapper).toContainReactText('ID: 1');
    expect(wrapper).toContainReactText('System: Test System');
    expect(wrapper).toContainReactText('Creatures');
    expect(wrapper).toContainReactText('Items');
    expect(wrapper).toContainReactText('Handouts');
    expect(wrapper).toContainReactText('Hello, world!');
    expect(wrapper).toContainReactText('Lorem ipsum');

    expect(wrapper).toContainReactText('Test Image');

    expect(creatureTable).toContainReactText('2');
    expect(creatureTable).toContainReactText('Test Creature');

    expect(itemTable).toContainReactText('3');
    expect(itemTable).toContainReactText('Test Item');

    expect(image?.props.alt).toEqual('image description');
    expect(image?.props.src).toEqual('/');
  });

  it('should not render when data is null', () => {
    const queryClient = new QueryClient();

    // @ts-expect-error This is a Jest mock
    useAdventure.mockImplementation(() => {
      return {
        data: null,
        isFetching: false,
        isLoading: false,
        isPending: false,
        isSuccess: false
      };
    });

    const wrapper = mount(
      <QueryClientProvider client={queryClient}>
        <AdventurePage />
      </QueryClientProvider>
    );

    expect(wrapper).toContainReactText('Compendium');
    expect(wrapper).toContainReactText('Back to Adventures');
    expect(wrapper).not.toContainReactText('ID:');
    expect(wrapper).not.toContainReactText('System:');
    expect(wrapper).not.toContainReactText('Creatures');
    expect(wrapper).not.toContainReactText('Items');
    expect(wrapper).not.toContainReactText('Handouts');
  });

  it('should not render when data is loading', () => {
    const queryClient = new QueryClient();

    // @ts-expect-error This is a Jest mock
    useAdventure.mockImplementation(() => {
      return {
        data: {},
        isFetching: true,
        isLoading: true,
        isPending: true,
        isSuccess: false
      };
    });

    const wrapper = mount(
      <QueryClientProvider client={queryClient}>
        <AdventurePage />
      </QueryClientProvider>
    );

    expect(wrapper).not.toContainReactText('Compendium');
    expect(wrapper).not.toContainReactText('Back to Adventures');
    expect(wrapper).not.toContainReactText('ID:');
    expect(wrapper).not.toContainReactText('System:');
    expect(wrapper).not.toContainReactText('Creatures');
    expect(wrapper).not.toContainReactText('Items');
    expect(wrapper).not.toContainReactText('Handouts');
  });
});
