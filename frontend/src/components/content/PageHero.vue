<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<template>
  <section class="mt-4 border-l-4 border-[var(--bc-blue)] bg-[var(--bc-surface-light)] px-6 pt-2 pb-4">
    <h1>{{ title }}</h1>
    <p class="mt-4 text-lg text-[var(--bc-text-secondary)]">
      <slot />
    </p>
    <div
      v-if="$slots.actions"
      class="mt-8 flex flex-wrap gap-4"
    >
      <slot name="actions" />
    </div>
  </section>
</template>
