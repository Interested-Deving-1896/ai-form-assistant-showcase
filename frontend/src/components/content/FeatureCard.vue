<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';

import type { RouteLocationRaw } from 'vue-router';

const props = defineProps<{
  // PrimeIcons name without the 'pi-' prefix, e.g. 'bolt'
  icon: string;
  title: string;
  // Places the description beside the icon, under the title, instead of below both
  compact?: boolean;
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
    class="grid grid-cols-[auto_1fr] content-start items-center gap-x-3 rounded border border-[var(--bc-border)] bg-white p-4"
    :class="{ 'feature-card-link': to || href }"
  >
    <!-- When compact, the icon spans the title and description rows so it centres on both -->
    <div
      class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--bc-blue)] text-white"
      :class="{ 'row-span-2': compact }"
    >
      <i :class="['pi', `pi-${icon}`]" />
    </div>
    <h3
      class="feature-card-title m-0"
      :class="{ compact }"
    >
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
    </h3>
    <p
      v-if="$slots.default"
      class="mb-0 text-[var(--bc-text)]"
      :class="compact ? 'col-start-2 mt-0' : 'col-span-2 mt-2'"
    >
      <slot />
    </p>
  </component>
</template>

<style lang="scss" scoped>
// Heading 3 for the page outline, sized down to fit the card
.feature-card-title {
  font-size: var(--bcds-typography-font-size-large-body);
  line-height: var(--bcds-typography-line-heights-xdense);

  // Tighter leading keeps the title close to the description beside the icon
  &.compact {
    line-height: var(--bcds-typography-line-heights-xxdense);
  }
}

// Global styles underline every link, which would underline the whole card
.feature-card-link {
  text-decoration: none;
  transition: box-shadow 200ms;

  .feature-card-title {
    color: var(--bc-link);
  }

  &:hover {
    border-color: var(--bc-border-medium);
    box-shadow: var(--bcds-surface-shadow-medium);

    .feature-card-title {
      color: var(--bc-link-hover);
      text-decoration: underline;
    }
  }

  @media (prefers-reduced-motion) {
    transition: none;
  }
}
</style>
