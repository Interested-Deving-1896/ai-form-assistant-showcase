<script setup lang="ts">
defineProps<{
  alt: string;
  src: string;
  caption?: string;
  // Link to where the diagram is documented
  href?: string;
}>();
</script>

<template>
  <figure class="m-0">
    <div
      class="mt-6 flex items-center justify-center rounded border border-[var(--bc-border)] bg-white p-10"
    >
      <!-- Full width so SVGs without intrinsic dimensions (viewBox only) don't collapse to zero width -->
      <a
        :href="src"
        target="_blank"
        rel="noopener noreferrer"
        title="Open full size"
        class="block w-full"
      >
        <img
          :src="src"
          :alt="alt"
          class="mx-auto block max-h-100 w-full object-contain"
        />
      </a>
    </div>
    <figcaption
      v-if="caption || href"
      class="mt-4 text-sm text-[var(--bc-text-secondary)]"
    >
      {{ caption }}
      <a
        v-if="href"
        :href="href"
        target="_blank"
        rel="noopener noreferrer"
      >
        View in the documentation
        <i
          class="pi pi-external-link text-xs"
          aria-hidden="true"
        />
      </a>
    </figcaption>
  </figure>
</template>
