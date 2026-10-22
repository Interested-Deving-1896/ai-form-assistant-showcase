import { mount, RouterLinkStub } from '@vue/test-utils';

import FeatureCard from '@/components/content/FeatureCard.vue';

const global = { stubs: { RouterLink: RouterLinkStub } };

describe('FeatureCard.vue', () => {
  it('renders a plain card without a link', () => {
    const wrapper = mount(FeatureCard, {
      props: { icon: 'bolt', title: 'Fast' },
      slots: { default: 'Card body' },
      global
    });
    expect(wrapper.element.tagName).toBe('DIV');
    expect(wrapper.find('.pi-bolt').exists()).toBe(true);
    expect(wrapper.text()).toContain('Fast');
    expect(wrapper.text()).toContain('Card body');
  });

  it('renders an internal link with `to`', () => {
    const wrapper = mount(FeatureCard, {
      props: { icon: 'bolt', title: 'Home', to: { name: 'home' } },
      global
    });
    expect(wrapper.findComponent(RouterLinkStub).props('to')).toEqual({ name: 'home' });
  });

  it('renders an external link with `href` that opens in a new tab', () => {
    const wrapper = mount(FeatureCard, {
      props: { icon: 'book', title: 'Docs', href: 'https://example.com' },
      global
    });
    const link = wrapper.find('a');
    expect(link.attributes('href')).toBe('https://example.com');
    expect(link.attributes('target')).toBe('_blank');
    expect(link.attributes('rel')).toBe('noopener noreferrer');
  });

  it('shows a lock when locked', () => {
    const wrapper = mount(FeatureCard, {
      props: { icon: 'desktop', title: 'Demo', locked: true },
      global
    });
    expect(wrapper.find('.pi-lock').exists()).toBe(true);
    expect(wrapper.text()).toContain('(login required)');
  });
});
