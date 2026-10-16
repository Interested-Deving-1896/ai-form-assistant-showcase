import { createTestingPinia } from '@pinia/testing';
import { mount, RouterLinkStub } from '@vue/test-utils';

import PrimeVue from 'primevue/config';
import { StorageKey } from '@/utils/constants';
import AiFormAssistChefsDemoView from '@/views/ai-form-assist/AiFormAssistChefsDemoView.vue';
import AiFormAssistOnboardingView from '@/views/ai-form-assist/AiFormAssistOnboardingView.vue';
import AiFormAssistOverviewView from '@/views/ai-form-assist/AiFormAssistOverviewView.vue';
import AiServicesHubView from '@/views/AiServicesHubView.vue';
import ContactView from '@/views/ContactView.vue';
import HomeView from '@/views/HomeView.vue';

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
});

afterEach(() => {
  sessionStorage.clear();
});

function mountView(view: Parameters<typeof mount>[0], initialState = {}) {
  return mount(view, {
    global: {
      plugins: [createTestingPinia({ initialState }), PrimeVue],
      stubs: { RouterLink: RouterLinkStub }
    }
  });
}

// Smoke tests: each content page renders its heading without runtime errors
describe('content views', () => {
  it.each([
    [HomeView, 'A Practical Path to AI Adoption'],
    [AiFormAssistOverviewView, 'AI Form Assist'],
    [AiFormAssistOnboardingView, 'Onboarding to AI Form Assist'],
    [AiFormAssistChefsDemoView, 'AI Form Assist in CHEFS'],
    [AiServicesHubView, 'AI Services Hub'],
    [ContactView, 'Contact Us']
  ])('renders %#', (view, heading) => {
    expect(mountView(view).find('h1').text()).toBe(heading);
  });

  it('links to the CHEFS demo when it is configured', () => {
    const wrapper = mountView(AiFormAssistChefsDemoView, {
      config: { config: { chefsDemoUrl: 'https://chefs.example/form' } }
    });
    expect(wrapper.find('a[href="https://chefs.example/form"]').exists()).toBe(true);
    expect(wrapper.text()).not.toContain("isn't available in this environment");
  });

  it('explains when the CHEFS demo is not configured', () => {
    const wrapper = mountView(AiFormAssistChefsDemoView);
    expect(wrapper.text()).toContain("The CHEFS demo isn't available in this environment.");
  });
});
