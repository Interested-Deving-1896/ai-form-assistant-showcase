<script setup lang="ts">
withDefaults(
  defineProps<{
    // Sets the colours and icon
    variant?: 'info' | 'success' | 'warning' | 'danger';
    title?: string;
  }>(),
  { variant: 'info', title: undefined }
);

// PrimeIcons closest to the BC Design System alert icons
const icons = {
  info: 'pi-info-circle',
  success: 'pi-check-circle',
  warning: 'pi-exclamation-triangle',
  danger: 'pi-exclamation-circle'
};
</script>

<template>
  <!-- BC Design System inline alert: https://www2.gov.bc.ca/gov/content/digital/design-system/components/inline-alert -->
  <div
    class="inline-alert"
    :class="variant"
  >
    <i
      :class="['pi', icons[variant], 'inline-alert-icon']"
      aria-hidden="true"
    />
    <div class="inline-alert-content">
      <strong
        v-if="title"
        class="block"
      >
        {{ title }}
      </strong>
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.inline-alert {
  display: flex;
  align-items: flex-start;
  gap: var(--bcds-layout-margin-small);
  padding: var(--bcds-layout-padding-medium) var(--bcds-layout-padding-large);
  border: var(--bcds-layout-border-width-small) solid;
  border-radius: var(--bcds-layout-border-radius-medium);
  color: var(--bc-text);

  @each $variant in info, success, warning, danger {
    &.#{$variant} {
      border-color: var(--bcds-support-border-color-#{$variant});
      background-color: var(--bcds-support-surface-color-#{$variant});

      .inline-alert-icon {
        color: var(--bcds-icons-color-#{$variant});
      }
    }
  }
}

.inline-alert-icon {
  padding-top: var(--bcds-layout-padding-xsmall);
  font-size: var(--bcds-icons-size-medium);
}

.inline-alert-content {
  flex-grow: 1;
}
</style>
