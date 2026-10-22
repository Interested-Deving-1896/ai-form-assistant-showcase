import { createMemoryHistory, createRouter } from 'vue-router';

import { routes } from '@/router';
import { RouteNames, StorageKey } from '@/utils/constants';

function makeRouter() {
  return createRouter({ history: createMemoryHistory(), routes });
}

afterEach(() => {
  sessionStorage.clear();
});

describe('routes', () => {
  it.each([
    ['/', RouteNames.HOME],
    ['/ai-form-assist', RouteNames.AI_FORM_ASSIST],
    ['/ai-form-assist/demo', RouteNames.AI_FORM_ASSIST_DEMO],
    ['/ai-form-assist/chefs-demo', RouteNames.AI_FORM_ASSIST_CHEFS_DEMO],
    ['/ai-form-assist/onboarding', RouteNames.AI_FORM_ASSIST_ONBOARDING],
    ['/ai-services-hub', RouteNames.AI_SERVICES_HUB],
    ['/contact', RouteNames.CONTACT]
  ])('resolves %s', (path, name) => {
    expect(makeRouter().resolve(path).name).toBe(name);
  });

  it('requires login for the demo only', () => {
    const router = makeRouter();
    expect(router.resolve('/ai-form-assist/demo').meta.requiresAuth).toBe(true);
    expect(router.resolve('/ai-form-assist/chefs-demo').meta.requiresAuth).toBeUndefined();
  });

  it.each([
    ['/demo', RouteNames.AI_FORM_ASSIST_DEMO],
    ['/ai-form-assist/architecture', RouteNames.AI_FORM_ASSIST],
    ['/architecture', RouteNames.AI_FORM_ASSIST]
  ])('redirects legacy path %s', async (path, name) => {
    const router = makeRouter();
    await router.push(path);
    expect(router.currentRoute.value.name).toBe(name);
  });

  describe('login entrypoint', () => {
    it('stores the in-app path passed by the auth guard', async () => {
      await makeRouter().push({ name: RouteNames.LOGIN, query: { entrypoint: '/ai-form-assist/demo' } });
      expect(sessionStorage.getItem(StorageKey.AUTH)).toBe('/ai-form-assist/demo');
    });

    it('falls back to the current page for paths outside the app', async () => {
      await makeRouter().push({ name: RouteNames.LOGIN, query: { entrypoint: '//evil.example' } });
      expect(sessionStorage.getItem(StorageKey.AUTH)).toBe(
        `${window.location.pathname}${window.location.search}${window.location.hash}`
      );
    });
  });
});
