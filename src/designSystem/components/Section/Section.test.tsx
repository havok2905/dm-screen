/**
 * @jest-environment jsdom
 */

import '@shopify/react-testing/matchers';
import { mount } from '@shopify/react-testing';
import { Section } from './Section';

describe('Section', () => {
  it('should render default', () => {
    const wrapper = mount(
      <Section>
        <p>Hello, world!</p>
      </Section>
    );

    expect(wrapper).toContainReactHtml('<p>Hello, world!</p>');
    const header = wrapper.findWhere<'div'>(
      (node) => node.is('div') && node.prop('className') === 'dm-screen-design-system-section-header',
    );

    expect(header).toBeFalsy();
  });

  it('should render header if only title exists', () => {
    const wrapper = mount(
      <Section sectionTitle='test title'>
        <p>Hello, world!</p>
      </Section>
    );

    const header = wrapper.findWhere<'div'>(
      (node) => node.is('div') && node.prop('className') === 'dm-screen-design-system-section-header',
    );

    expect(header).toBeTruthy();
  });

  it('should render header if only actions exists', () => {
    const wrapper = mount(
      <Section sectionActions={<button>Click Me</button>}>
        <p>Hello, world!</p>
      </Section>
    );

    const header = wrapper.findWhere<'div'>(
      (node) => node.is('div') && node.prop('className') === 'dm-screen-design-system-section-header',
    );

    expect(header).toBeTruthy();
  });

  it('should render header if both title and actions exist', () => {
    const wrapper = mount(
      <Section
        sectionActions={<button>Click Me</button>}
        sectionTitle="test title">
        <p>Hello, world!</p>
      </Section>
    );

    const header = wrapper.findWhere<'div'>(
      (node) => node.is('div') && node.prop('className') === 'dm-screen-design-system-section-header',
    );

    expect(header).toBeTruthy();
  });

  it('should render title with h1 by default', () => {
    const wrapper = mount(
      <Section sectionTitle="test title">
        <p>Hello, world!</p>
      </Section>
    );

    const header = wrapper.find('h1');
  
    expect(header).toContainReactText('test title');
  });

  it('should render title with h1', () => {
    const wrapper = mount(
      <Section
        sectionHeaderEl="h1"
        sectionTitle="test title">
        <p>Hello, world!</p>
      </Section>
    );

    const header = wrapper.find('h1');
  
    expect(header).toContainReactText('test title');
  });


  it('should render title with h2', () => {
    const wrapper = mount(
      <Section
        sectionHeaderEl="h2"
        sectionTitle="test title">
        <p>Hello, world!</p>
      </Section>
    );

    const header = wrapper.find('h2');
  
    expect(header).toContainReactText('test title');
  });

  it('should render title with h3', () => {
    const wrapper = mount(
      <Section
        sectionHeaderEl="h3"
        sectionTitle="test title">
        <p>Hello, world!</p>
      </Section>
    );

    const header = wrapper.find('h3');
  
    expect(header).toContainReactText('test title');
  });

  it('should render title with h4', () => {
    const wrapper = mount(
      <Section
        sectionHeaderEl="h4"
        sectionTitle="test title">
        <p>Hello, world!</p>
      </Section>
    );

    const header = wrapper.find('h4');
  
    expect(header).toContainReactText('test title');
  });

  it('should render title with h5', () => {
    const wrapper = mount(
      <Section
        sectionHeaderEl="h5"
        sectionTitle="test title">
        <p>Hello, world!</p>
      </Section>
    );

    const header = wrapper.find('h5');
  
    expect(header).toContainReactText('test title');
  });

  it('should render title with h6', () => {
    const wrapper = mount(
      <Section
        sectionHeaderEl="h6"
        sectionTitle="test title">
        <p>Hello, world!</p>
      </Section>
    );

    const header = wrapper.find('h6');
  
    expect(header).toContainReactText('test title');
  });
});