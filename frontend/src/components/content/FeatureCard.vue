<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';

import type { RouteLocationRaw } from 'vue-router';

const props = defineProps<{
  // PrimeIcons name without the 'pi-' prefix, e.g. 'bolt'
  icon: string;
  title: string;
  // External link, opened in a new tab
  href?: string;
  // Shows a lock to indicate the destination requires login
  locked?: boolean;
  // Internal route
  to?: RouteLocationRaw;
}>();

const tag = computed(() => (props.to ? RouterLink : props.href ? 'a' : 'div'));

const linkAttrs = computed(() => {
  if (props.to) return { to: props.to };
  if (props.href) return { href: props.href, target: '_blank', rel: 'noopener noreferrer' };
  return {};
});
</script>

<template>
  <component
    :is="tag"
    v-bind="linkAttrs"
    class="block rounded border border-[var(--bc-border)] bg-white p-4 transition-shadow hover:shadow-lg"
    :class="{ 'feature-card-link': to || href }"
  >
    <div class="flex items-center gap-3">
      <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--bc-blue)] text-white">
        <i :class="['pi', `pi-${icon}`]" />
      </div>
      <h5 class="m-0">
        {{ title }}
        <template v-if="locked">
          <i
            class="pi pi-lock ml-1 text-sm"
            aria-hidden="true"
          />
          <span class="sr-only">(login required)</span>
        </template>
        <i
          v-if="href"
          class="pi pi-external-link ml-1 text-xs"
          aria-hidden="true"
        />
      </h5>
    </div>
    <p class="mt-2 text-[var(--bc-text)]">
      <slot />
    </p>
  </component>
</template>

<style lang="scss" scoped>
// Global styles underline every link, which would underline the whole card
.feature-card-link {
  text-decoration: none;

  &:hover h5 {
    text-decoration: underline;
  }
}
</style>
