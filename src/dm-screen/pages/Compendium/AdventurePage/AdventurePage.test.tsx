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
import { Link, useNavigate, useParams } from 'react-router-dom';
jest.mock('react-router-dom', () => ({
  Link: MockReactRouterLink,
  useNavigate: jest.fn(),
  useParams: jest.fn().mockReturnValue({ id: '1' })
}));

import {
  useAddCreature,
  useAddEquipmentItem,
  useAddMagicItem,
  useAdventure,
  useCreatures,
  useDestroyAdventureCreature,
  useDestroyAdventureItem,
  useEquipmentItems,
  useMagicItems
} from '../../../hooks';
jest.mock('../../../hooks', () => ({
  useAddCreature: jest.fn().mockReturnValue({
    mutate: jest.fn()
  }),
  useAddEquipmentItem: jest.fn().mockReturnValue({
    mutate: jest.fn()
  }),
  useAddMagicItem: jest.fn().mockReturnValue({
    mutate: jest.fn()
  }),
  useAdventure: jest.fn(),
  useCreatures: jest.fn(),
  useDestroyAdventureCreature: jest.fn().mockReturnValue({
    mutate: jest.fn()
  }),
  useDestroyAdventureItem: jest.fn().mockReturnValue({
    mutate: jest.fn()
  }),
  useEquipmentItems: jest.fn(),
  useMagicItems: jest.fn(),
}));

const mockCreatures = {
  data: [],
  isFetching: false,
  isLoading: false,
  isPending: false,
  isSuccess: true
};

const mockMagicItems = {
  data: [],
  isFetching: false,
  isLoading: false,
  isPending: false,
  isSuccess: true
};

const mockEquipmentItems = {
  data: [],
  isFetching: false,
  isLoading: false,
  isPending: false,
  isSuccess: true
};

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

    // @ts-expect-error This is a Jest mock
    useCreatures.mockImplementation(() => {
      return mockCreatures;
    });

    // @ts-expect-error This is a Jest mock
    useEquipmentItems.mockImplementation(() => {
      return mockEquipmentItems;
    });

    // @ts-expect-error This is a Jest mock
    useMagicItems.mockImplementation(() => {
      return mockMagicItems;
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

  it('should delete a creature and refetch', () => {
    const queryClient = new QueryClient();

    const refetch = jest.fn();
    const mutate = jest.fn(() => {
      refetch();
    });

    // @ts-expect-error This is a Jest mock
    useAdventure.mockImplementation(() => {
      return {
        ...mockAdventure,
        refetch
      };
    });

    // @ts-expect-error This is a Jest mock
    useDestroyAdventureCreature.mockImplementation(() => {
      return {
        mutate
      };
    });

    const wrapper = mount(
      <QueryClientProvider client={queryClient}>
        <AdventurePage />
      </QueryClientProvider>
    );
    
    const destroyCreatureButton = wrapper.findAll('table')[0]?.findAll('button')[2];

    expect(destroyCreatureButton).toContainReactText('Remove');

    destroyCreatureButton.trigger('onClick');

    const modal = wrapper.findWhere<'div'>(
      (node) => node.is('div') && node.prop('className') === 'dm-screen-design-system-modal',
    );

    const okButton = modal?.findAll('button')[0];

    okButton?.trigger('onClick');

    expect(mutate).toHaveBeenCalled();
    expect(refetch).toHaveBeenCalled();
  });

  it('should delete an item and refetch', () => {
    const queryClient = new QueryClient();

    const refetch = jest.fn();
    const mutate = jest.fn(() => {
      refetch();
    });

    // @ts-expect-error This is a Jest mock
    useAdventure.mockImplementation(() => {
      return {
        ...mockAdventure,
        refetch
      };
    });

    // @ts-expect-error This is a Jest mock
    useDestroyAdventureItem.mockImplementation(() => {
      return {
        mutate
      };
    });

    const wrapper = mount(
      <QueryClientProvider client={queryClient}>
        <AdventurePage />
      </QueryClientProvider>
    );
    
    const destroyItemButton = wrapper.findAll('table')[1]?.findAll('button')[2];

    expect(destroyItemButton).toContainReactText('Remove');

    destroyItemButton.trigger('onClick');

    const modal = wrapper.findWhere<'div'>(
      (node) => node.is('div') && node.prop('className') === 'dm-screen-design-system-modal',
    );

    const okButton = modal?.findAll('button')[0];

    okButton?.trigger('onClick');

    expect(mutate).toHaveBeenCalled();
    expect(refetch).toHaveBeenCalled();
  });
});
