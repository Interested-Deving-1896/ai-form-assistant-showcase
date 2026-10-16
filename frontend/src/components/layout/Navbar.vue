<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import { Toolbar } from '@/lib/primevue';
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
  <nav class="navigation-main">
    <div class="mx-auto w-full max-w-[1200px] pl-2 lg:pl-12">
      <Toolbar>
        <template #start>
          <ol class="list-none m-0 p-0 flex flex-row items-center font-semibold">
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
                <i class="pi pi-chevron-down submenu-caret" />
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
        </template>
      </Toolbar>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
$nav-bg: #1a5a96;
$nav-accent: #fcba19;
$nav-active-bg: #7ba2cc80;
$nav-text: #ffffff;
$nav-shadow: 0 6px 8px -4px #b3b1b3;

.navigation-main {
  background-color: $nav-bg;
  color: $nav-accent;
  display: flex;
  width: 100%;
  box-shadow: $nav-shadow;

  .p-toolbar {
    background-color: $nav-bg !important;
    border: none;
    padding: 0;

    ol {
      display: flex;
      flex-direction: row;
      margin: 0;
      color: $nav-text;
      list-style: none;

      li {
        margin-right: 1em;

        a {
          display: flex;
          font-weight: normal;
          min-height: 2rem;
          color: $nav-text;
          padding: 0.5rem 0.8rem 0.7rem 0.8rem;
          text-decoration: none;

          &:focus {
            outline: none;
            outline-offset: 0;
          }
          &:hover {
            text-decoration: underline;
          }
        }
        & ~ li {
          margin-left: -0.6rem;
        }
      }

      .router-link-exact-active {
        background-color: $nav-active-bg;
        border-bottom: 2px solid $nav-accent;
        font-weight: bold;
      }

      .has-submenu {
        position: relative;
        display: flex;
        align-items: center;

        > .router-link-exact-active {
          background-color: transparent;
          border-bottom: none;
        }

        &.active {
          background-color: $nav-active-bg;
          border-bottom: 2px solid $nav-accent;

          &.submenu-open {
            border-bottom-color: $nav-active-bg;
          }
        }

        .submenu-toggle {
          display: flex;
          align-items: center;
          height: 100%;
          margin: 0 0.5rem 0 -0.5rem;
          padding: 0.5rem;
          background: none;
          border: none;
          color: $nav-text;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }

        .submenu-caret {
          font-size: 0.7rem;
        }

        .submenu-lock {
          align-self: center;
          font-size: 0.75rem;
          margin-left: 0.5rem;
        }

        .submenu {
          position: absolute;
          top: 100%;
          left: 0;
          z-index: 10;
          min-width: 180px;
          margin: 0;
          padding: 0;
          list-style: none;
          background-color: $nav-bg;
          box-shadow: $nav-shadow;

          li {
            margin: 0;

            a {
              white-space: nowrap;
              background-color: $nav-active-bg;
            }

            .router-link-exact-active {
              border-bottom: none;
            }
          }
        }
      }
    }
  }
}
</style>
