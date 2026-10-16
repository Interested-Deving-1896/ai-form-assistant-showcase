<script setup lang="ts">
import { ref } from 'vue';

withDefaults(
  defineProps<{
    // Sets the colours and icon
    variant?: 'info' | 'success' | 'warning' | 'danger';
  }>(),
  { variant: 'info' }
);

// PrimeIcons closest to the BC Design System alert icons
const icons = {
  info: 'pi-info-circle',
  success: 'pi-check-circle',
  warning: 'pi-exclamation-triangle',
  danger: 'pi-exclamation-circle'
};

const isVisible = ref(true);
</script>

<template>
  <!-- BC Design System alert banner: https://www2.gov.bc.ca/gov/content/digital/design-system/components/alert-banner -->
  <div
    v-if="isVisible"
    class="alert-banner"
    :class="variant"
  >
    <div class="layout-container alert-banner-container">
      <i
        :class="['pi', icons[variant], 'alert-banner-icon']"
        aria-hidden="true"
      />
      <div class="alert-banner-content">
        <slot />
      </div>
      <button
        type="button"
        class="btn btn-tertiary btn-icon alert-banner-close"
        aria-label="Close"
        @click="isVisible = false"
      >
        <i
          class="pi pi-times"
          aria-hidden="true"
        />
      </button>
    </div>
  </div>
</template>

<style scoped>
.alert-banner {
  color: var(--bcds-typography-color-primary-invert);
}

.alert-banner.info {
  background-color: var(--bcds-surface-color-background-dark-blue);
}

.alert-banner.success {
  background-color: var(--bcds-support-border-color-success);
}

.alert-banner.danger {
  background-color: var(--bcds-support-border-color-danger);
}

.alert-banner.warning {
  background-color: var(--bcds-support-border-color-warning);
  color: var(--bc-text);
}

.alert-banner-container {
  display: flex;
  align-items: flex-start;
  gap: var(--bcds-layout-padding-medium);
  padding-top: var(--bcds-layout-padding-small);
  padding-bottom: var(--bcds-layout-padding-small);
}

.alert-banner-icon {
  padding-top: var(--bcds-layout-padding-xsmall);
  font-size: var(--bcds-icons-size-medium);
}

.alert-banner-content {
  flex-grow: 1;
}

.alert-banner-content :deep(p) {
  margin: 0;
}

/* The banner sets the text colour, including on hover */
.alert-banner-close,
.alert-banner-close:hover {
  color: inherit;
}

.alert-banner:not(.warning) .alert-banner-close:hover {
  color: var(--bc-text);
}
</style>
