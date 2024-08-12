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
import { Link, useParams } from 'react-router-dom';
jest.mock('react-router-dom', () => ({
  Link: MockReactRouterLink,
  useParams: jest.fn().mockReturnValue({ id: '1' })
}));

import { useAdventure } from '../../../hooks';
jest.mock('../../../hooks', () => ({
  useAdventure: jest.fn()
}));

const mockAdventure = {
  data: {
    creatures: [
      {
        content: `# Hello, creature!`,
        id: '2',
        image: 'creature.png',
        metadata: [
          {
            name: 'Type',
            type: 'string',
            value: 'Beast'
          },
          {
            name: 'AC',
            type: 'number',
            value: 15
          },
          {
            name: 'HP',
            type: 'number',
            value: 25
          },
          {
            name: 'CR',
            type: 'string',
            value: '1/2'
          }
        ],
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
        content: `# Hello, item!`,
        id: '3',
        image: 'item.png',
        metadata: [
          {
            name: 'Rarity',
            type: 'string',
            value: 'Common'
          },
          {
            name: 'Cost',
            type: 'string',
            value: '2GP'
          }
        ],
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

describe('AdventurePage', () => {
  it('should render', () => {
    const queryClient = new QueryClient();

    // @ts-expect-error This is a Jest mock
    useAdventure.mockImplementation(() => {
      return mockAdventure;
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

  it('should toggle creatures', () => {
    const queryClient = new QueryClient();

    // @ts-expect-error This is a Jest mock
    useAdventure.mockImplementation(() => {
      return mockAdventure;
    });

    const wrapper = mount(
      <QueryClientProvider client={queryClient}>
        <AdventurePage />
      </QueryClientProvider>
    );

    let creatureToggle;
    
    creatureToggle = wrapper.find('table')?.find('button');
    expect(creatureToggle).toContainReactText('Expand');
    expect(wrapper).not.toContainReactText('Hello, creature!');
    expect(wrapper).not.toContainReactText('Type: Beast');
    expect(wrapper).not.toContainReactText('AC: 15');
    expect(wrapper).not.toContainReactText('HP: 25');
    expect(wrapper).not.toContainReactText('CR: 1/2');
    creatureToggle?.trigger('onClick');

    creatureToggle = wrapper.find('table')?.find('button');
    expect(creatureToggle).toContainReactText('Collapse');
    expect(wrapper).toContainReactText('Hello, creature!');
    expect(wrapper).toContainReactText('Type: Beast');
    expect(wrapper).toContainReactText('AC: 15');
    expect(wrapper).toContainReactText('HP: 25');
    expect(wrapper).toContainReactText('CR: 1/2');
    creatureToggle?.trigger('onClick');

    creatureToggle = wrapper.find('table')?.find('button');
    expect(creatureToggle).toContainReactText('Expand');
    expect(wrapper).not.toContainReactText('Hello, creature!');
    expect(wrapper).not.toContainReactText('Type: Beast');
    expect(wrapper).not.toContainReactText('AC: 15');
    expect(wrapper).not.toContainReactText('HP: 25');
    expect(wrapper).not.toContainReactText('CR: 1/2');
  });

  it('should toggle items', () => {
    const queryClient = new QueryClient();

    // @ts-expect-error This is a Jest mock
    useAdventure.mockImplementation(() => {
      return mockAdventure;
    });

    const wrapper = mount(
      <QueryClientProvider client={queryClient}>
        <AdventurePage />
      </QueryClientProvider>
    );

    let itemToggle;
    
    itemToggle = wrapper.findAll('table')[1]?.find('button');
    expect(itemToggle).toContainReactText('Expand');
    expect(wrapper).not.toContainReactText('Hello, item!');
    expect(wrapper).not.toContainReactText('Rarity: Common');
    expect(wrapper).not.toContainReactText('Cost: 2GP');
    itemToggle?.trigger('onClick');

    itemToggle = wrapper.findAll('table')[1]?.find('button');
    expect(itemToggle).toContainReactText('Collapse');
    expect(wrapper).toContainReactText('Hello, item!');
    expect(wrapper).toContainReactText('Rarity: Common');
    expect(wrapper).toContainReactText('Cost: 2GP');
    itemToggle?.trigger('onClick');

    itemToggle = wrapper.findAll('table')[1]?.find('button');
    expect(itemToggle).toContainReactText('Expand');
    expect(wrapper).not.toContainReactText('Hello, item!');
    expect(wrapper).not.toContainReactText('Rarity: Common');
    expect(wrapper).not.toContainReactText('Cost: 2GP');
  });
});
