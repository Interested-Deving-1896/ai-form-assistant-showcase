<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<template>
  <!-- BC Design System callout: https://www2.gov.bc.ca/gov/content/digital/design-system/components/callout -->
  <section class="my-10 rounded-l border-l-4 border-[var(--bc-blue)] bg-[var(--bc-surface-light)] px-6 py-4">
    <h2 class="callout-title my-0">{{ title }}</h2>
    <slot />
  </section>
</template>

<style scoped>
.callout-title {
  font-size: var(--bcds-typography-font-size-large-body);
  line-height: var(--bcds-typography-line-heights-dense);
}
</style>
