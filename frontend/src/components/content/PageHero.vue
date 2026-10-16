<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<template>
  <section class="mt-4 pb-8">
    <h1 class="mt-0">{{ title }}</h1>
    <p class="page-hero-lead mb-0">
      <slot />
    </p>
    <div
      v-if="$slots.actions"
      class="mt-6 flex flex-wrap gap-4"
    >
      <slot name="actions" />
    </div>
  </section>
</template>

<style scoped>
.page-hero-lead {
  max-width: 50rem;
  color: var(--bc-text-secondary);

  /* font-size: var(--bcds-typography-font-size-large-body); */
  line-height: var(--bcds-typography-line-heights-dense);
}
h1 {
  font-size: var(--bcds-typography-font-size-h2);
}
</style>
