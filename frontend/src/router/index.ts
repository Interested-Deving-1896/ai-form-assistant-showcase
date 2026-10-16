import { createRouter, createWebHistory } from 'vue-router';

import { AuthService } from '@/services';
import { useAppStore } from '@/store';
import { RouteNames, StorageKey } from '@/utils/constants';

import type { RouteLocationNormalized, RouteRecordRaw } from 'vue-router';

/**
 * @function createProps
 * Parses the route query and params to generate vue props
 * @param {object} route The route object
 * @returns {object} a Vue props object
 */
// function createProps(route: { query: any; params: any; }): object {
//   return { ...route.query, ...route.params };
// }

/**
 * @function getLoginEntrypoint
 * Determines where to return the user after logging in. Prefers an in-app path passed as the
 * `entrypoint` query param (set by the authentication guard), otherwise the current page.
 * @param {RouteLocationNormalized} to The login route being entered
 * @returns {string} The path to return to after login
 */
function getLoginEntrypoint(to: RouteLocationNormalized): string {
  const entrypoint = to.query.entrypoint;
  // Only accept same-app paths; '//host' would be treated as another origin
  if (typeof entrypoint === 'string' && entrypoint.startsWith('/') && !entrypoint.startsWith('//')) {
    return entrypoint;
  }
  return `${window.location.pathname}${window.location.search}${window.location.hash}`;
}

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: RouteNames.HOME,
    component: () => import('../views/HomeView.vue'),
    meta: { title: 'Home' }
  },
  {
    path: '/ai-form-assist',
    name: RouteNames.AI_FORM_ASSIST,
    component: () => import('@/views/ai-form-assist/AiFormAssistOverviewView.vue'),
    meta: { title: 'AI Form Assist' }
  },
  {
    path: '/ai-form-assist/demo',
    name: RouteNames.AI_FORM_ASSIST_DEMO,
    component: () => import('@/views/ai-form-assist/AiFormAssistDemoView.vue'),
    meta: { requiresAuth: true, title: 'AI Form Assist Demo' }
  },
  {
    path: '/ai-form-assist/chefs-demo',
    name: RouteNames.AI_FORM_ASSIST_CHEFS_DEMO,
    component: () => import('@/views/ai-form-assist/AiFormAssistChefsDemoView.vue'),
    meta: { title: 'AI Form Assist CHEFS Demo' }
  },
  {
    path: '/ai-form-assist/onboarding',
    name: RouteNames.AI_FORM_ASSIST_ONBOARDING,
    component: () => import('@/views/ai-form-assist/AiFormAssistOnboardingView.vue'),
    meta: { title: 'AI Form Assist Onboarding' }
  },
  {
    path: '/ai-services-hub',
    name: RouteNames.AI_SERVICES_HUB,
    component: () => import('@/views/AiServicesHubView.vue'),
    meta: { title: 'AI Services Hub' }
  },
  {
    path: '/contact',
    name: RouteNames.CONTACT,
    component: () => import('@/views/ContactView.vue'),
    meta: { title: 'Contact' }
  },
  // Legacy paths from the previous site structure
  {
    path: '/demo',
    redirect: { name: RouteNames.AI_FORM_ASSIST_DEMO }
  },
  {
    path: '/ai-form-assist/architecture',
    redirect: { name: RouteNames.AI_FORM_ASSIST }
  },
  {
    path: '/architecture',
    redirect: { name: RouteNames.AI_FORM_ASSIST }
  },
  {
    path: '/developer',
    name: RouteNames.DEVELOPER,
    component: () => import('@/views/DeveloperView.vue'),
    meta: { requiresAuth: true, title: 'Developer' }
  },
  {
    path: '/oidc',
    component: () => import('@/views/GenericView.vue'),
    children: [
      {
        path: 'callback',
        name: RouteNames.CALLBACK,
        component: () => import('@/views/oidc/OidcCallbackView.vue'),
        meta: { title: 'Authenticating...' }
      },
      {
        path: 'login',
        name: RouteNames.LOGIN,
        component: () => import('@/views/oidc/OidcLoginView.vue'),
        meta: { title: 'Logging in...' },
        beforeEnter: (to) => {
          window.sessionStorage.setItem(StorageKey.AUTH, getLoginEntrypoint(to));
        }
      },
      {
        path: 'logout',
        name: RouteNames.LOGOUT,
        component: () => import('@/views/oidc/OidcLogoutView.vue'),
        meta: { title: 'Logging out...' }
      }
    ]
  },
  {
    path: '/forbidden',
    name: RouteNames.FORBIDDEN,
    component: () => import('@/views/Forbidden.vue'),
    meta: { title: 'Forbidden' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
    meta: { title: 'Not Found' }
  }
];

export default function getRouter() {
  const appStore = useAppStore();
  const authService = new AuthService();
  const router = createRouter({
    history: createWebHistory(),
    routes,
    // Scroll to the section a #hash names, e.g. a link to another page's section. Back and forward restore the
    // previous position; any other navigation starts at the top of the page.
    scrollBehavior(to, _from, savedPosition) {
      if (savedPosition) return savedPosition;
      if (to.hash) return { el: to.hash };
      return { top: 0 };
    }
  });

  router.beforeEach(async (to) => {
    appStore.beginDeterminateLoading();

    // Backend Redirection Handler
    if (to.query?.r) {
      router.replace({
        path: to.query.r ? to.query.r.toString() : to.path,
        // eslint-disable-next-line no-unused-vars
        query: (({ r, ...q }) => q)(to.query)
      });
    }

    // Authentication Guard
    // Uses router.replace (not a returned redirect) so the cancelled navigation still reaches afterEach
    // and the loading counter stays balanced. The target path is passed along so login can return to it.
    if (to.meta.requiresAuth) {
      const user = await authService.getUser();
      if (!user || user.expired) {
        router.replace({ name: RouteNames.LOGIN, query: { entrypoint: to.fullPath } });
      }
    }
  });

  router.afterEach((to) => {
    // Update document title
    document.title = to.meta.title ? `AI Form-Assistant showcase - ${to.meta.title}` : 'AI Form-Assistant showcase';

    appStore.endDeterminateLoading();
  });

  return router;
}
