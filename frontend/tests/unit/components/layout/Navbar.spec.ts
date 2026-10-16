import { createTestingPinia } from '@pinia/testing';
import { mount, RouterLinkStub } from '@vue/test-utils';

import PrimeVue from 'primevue/config';
import Navbar from '@/components/layout/Navbar.vue';
import { StorageKey } from '@/utils/constants';

const { mockRoute } = vi.hoisted(() => ({
  mockRoute: { path: '/', fullPath: '/' }
}));

// Mock router calls
vi.mock('vue-router', () => ({
  useRoute: () => mockRoute
}));

beforeEach(() => {
  sessionStorage.setItem(
    StorageKey.CONFIG,
    JSON.stringify({
      oidc: {
        authority: 'abc',
        clientId: '123'
      }
    })
  );
  mockRoute.path = '/';
  mockRoute.fullPath = '/';

  vi.clearAllMocks();
});

afterEach(() => {
  sessionStorage.clear();
});

function mountNavbar(isAuthenticated = false) {
  return mount(Navbar, {
    global: {
      plugins: [createTestingPinia({ initialState: { auth: { isAuthenticated } } }), PrimeVue],
      stubs: { RouterLink: RouterLinkStub }
    }
  });
}

describe('Navbar.vue', () => {
  it('renders the top-level navigation', () => {
    const wrapper = mountNavbar();
    const labels = wrapper.findAllComponents(RouterLinkStub).map((link) => link.text());
    expect(labels).toEqual(['Home', 'AI Form Assist', 'AI Services Hub', 'Contact']);
  });

  it('toggles the AI Form Assist submenu', async () => {
    const wrapper = mountNavbar();
    expect(wrapper.find('.submenu').exists()).toBe(false);

    await wrapper.find('.submenu-toggle').trigger('click');
    const items = wrapper.findAll('.submenu li').map((item) => item.text().replace('(login required)', '').trim());
    expect(items).toEqual(['Overview', 'Demo', 'CHEFS Demo', 'Onboarding']);

    await wrapper.find('.submenu-toggle').trigger('click');
    expect(wrapper.find('.submenu').exists()).toBe(false);
  });

  it('closes the submenu on Escape', async () => {
    const wrapper = mountNavbar();
    await wrapper.find('.submenu-toggle').trigger('click');
    await wrapper.find('.has-submenu').trigger('keydown', { key: 'Escape' });
    expect(wrapper.find('.submenu').exists()).toBe(false);
  });

  it('shows a lock on the demo while logged out', async () => {
    const wrapper = mountNavbar(false);
    await wrapper.find('.submenu-toggle').trigger('click');
    expect(wrapper.findAll('.submenu .pi-lock')).toHaveLength(1);
  });

  it('hides the lock once logged in', async () => {
    const wrapper = mountNavbar(true);
    await wrapper.find('.submenu-toggle').trigger('click');
    expect(wrapper.find('.submenu .pi-lock').exists()).toBe(false);
  });

  it.each([
    ['/ai-form-assist', true],
    ['/ai-form-assist/onboarding', true],
    ['/contact', false]
  ])('highlights the AI Form Assist section on %s: %s', (path, active) => {
    mockRoute.path = path;
    const wrapper = mountNavbar();
    expect(wrapper.find('.has-submenu').classes().includes('active')).toBe(active);
  });
});
