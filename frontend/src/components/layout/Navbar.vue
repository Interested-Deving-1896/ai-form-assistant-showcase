<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import { useAuthStore } from '@/store';
import { RouteNames } from '@/utils/constants';

const { getIsAuthenticated } = storeToRefs(useAuthStore());
const route = useRoute();

// Pages in the AI Form Assist submenu. Auth-only pages stay listed and show a lock until the user logs in.
const formAssistPages = [
  { label: 'Overview', name: RouteNames.AI_FORM_ASSIST },
  { label: 'Demo', name: RouteNames.AI_FORM_ASSIST_DEMO, requiresAuth: true },
  { label: 'CHEFS Demo', name: RouteNames.AI_FORM_ASSIST_CHEFS_DEMO },
  { label: 'Onboarding', name: RouteNames.AI_FORM_ASSIST_ONBOARDING }
];

const isFormAssistActive = computed(() => route.path.startsWith('/ai-form-assist'));
const isSubmenuOpen = ref(false);
const submenuContainer = ref<HTMLElement | null>(null);

function handleClickOutside(event: MouseEvent) {
  if (submenuContainer.value && !submenuContainer.value.contains(event.target as Node)) {
    isSubmenuOpen.value = false;
  }
}

watch(
  () => route.fullPath,
  () => (isSubmenuOpen.value = false)
);

onMounted(() => document.addEventListener('click', handleClickOutside));
onUnmounted(() => document.removeEventListener('click', handleClickOutside));
</script>

<template>
  <nav
    class="navigation-main"
    aria-label="Main"
  >
    <div class="layout-container">
      <ol class="nav-list">
        <li>
          <router-link :to="{ name: RouteNames.HOME }">Home</router-link>
        </li>
        <li
          ref="submenuContainer"
          class="has-submenu"
          :class="{ 'submenu-open': isSubmenuOpen, active: isFormAssistActive }"
          @keydown.esc="isSubmenuOpen = false"
        >
          <router-link :to="{ name: RouteNames.AI_FORM_ASSIST }">AI Form Assist</router-link>
          <button
            type="button"
            class="submenu-toggle"
            aria-label="Toggle AI Form Assist submenu"
            :aria-expanded="isSubmenuOpen"
            @click="isSubmenuOpen = !isSubmenuOpen"
          >
            <i
              class="pi pi-chevron-down submenu-caret"
              aria-hidden="true"
            />
          </button>
          <ul
            v-if="isSubmenuOpen"
            class="submenu"
          >
            <li
              v-for="page in formAssistPages"
              :key="page.name"
            >
              <router-link :to="{ name: page.name }">
                {{ page.label }}
                <template v-if="page.requiresAuth && !getIsAuthenticated">
                  <i
                    class="pi pi-lock submenu-lock"
                    aria-hidden="true"
                  />
                  <span class="sr-only">(login required)</span>
                </template>
              </router-link>
            </li>
          </ul>
        </li>
        <li>
          <router-link :to="{ name: RouteNames.AI_SERVICES_HUB }">AI Services Hub</router-link>
        </li>
        <li>
          <router-link :to="{ name: RouteNames.CONTACT }">Contact</router-link>
        </li>
      </ol>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
// Bar along the bottom of the current page's link
$current-indicator: inset 0 calc(-1 * var(--bcds-layout-border-width-large)) 0 var(--bc-blue);

.navigation-main {
  background-color: var(--bcds-surface-color-background-white);
  border-bottom: var(--bcds-layout-border-width-small) solid var(--bc-border);
}

.nav-list {
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  list-style: none;

  > li {
    display: flex;
  }

  a {
    display: flex;
    align-items: center;
    min-height: 3rem;
    padding: 0 var(--bcds-layout-padding-medium);
    color: var(--bc-text);
    text-decoration: none;

    &:hover {
      background-color: var(--bcds-surface-color-menus-hover);
      color: var(--bc-text);
    }
  }

  > li:not(.has-submenu) > .router-link-exact-active,
  > .has-submenu.active {
    box-shadow: $current-indicator;
  }
}

.has-submenu {
  position: relative;

  // The link and toggle hover as one item. The background goes on the item, not its children,
  // so it covers both and doesn't paint over the item's current-page bar.
  &:hover {
    background-color: var(--bcds-surface-color-menus-hover);
  }

  > a {
    padding-right: var(--bcds-layout-padding-xsmall);

    &:hover {
      background-color: transparent;
    }
  }

  .submenu-toggle {
    display: flex;
    align-items: center;
    padding: 0 var(--bcds-layout-padding-small);
    border: none;
    background: none;
    color: var(--bc-text);
    cursor: pointer;
  }

  .submenu-caret {
    font-size: 0.75rem;
    transition: transform 200ms;

    @media (prefers-reduced-motion) {
      transition: none;
    }
  }

  &.submenu-open .submenu-caret {
    transform: rotate(180deg);
  }

  .submenu-lock {
    margin-left: var(--bcds-layout-margin-small);
    font-size: 0.75rem;
  }

  // BC Design System menu
  .submenu {
    position: absolute;
    top: calc(100% + var(--bcds-layout-margin-xsmall));
    left: 0;
    z-index: 10;
    min-width: 12.5rem;
    margin: 0;
    padding: var(--bcds-layout-padding-xsmall);
    list-style: none;
    background-color: var(--bcds-surface-color-menus-default);
    border: var(--bcds-layout-border-width-small) solid var(--bc-border);
    border-radius: var(--bcds-layout-border-radius-medium);
    box-shadow: var(--bcds-surface-shadow-medium);

    a {
      min-height: auto;
      padding: var(--bcds-layout-padding-small);
      border-radius: var(--bcds-layout-border-radius-small);
      white-space: nowrap;
    }

    .router-link-exact-active {
      font-weight: var(--bcds-typography-font-weights-bold);
    }
  }
}
</style>
