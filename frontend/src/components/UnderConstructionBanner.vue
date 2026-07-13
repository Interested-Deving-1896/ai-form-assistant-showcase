<script setup lang="ts">
import { ref } from 'vue';

const isVisible = ref(true);
</script>

<template>
  <div
    v-if="isVisible"
    class="construction-banner"
  >
    <div class="construction-banner-content flex items-start gap-3 py-3 px-6 lg:px-16">
      <i class="pi pi-exclamation-triangle construction-banner-icon" />
      <div class="grow">
        <p class="construction-banner-title">Under Construction</p>
        <p class="construction-banner-text">
          This website is currently under construction. Some content and features may be incomplete or subject to
          change.
        </p>
      </div>
      <button
        type="button"
        class="construction-banner-close"
        aria-label="Close"
        @click="isVisible = false"
      >
        <i class="pi pi-times" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.construction-banner {
  background-color: var(--bc-gold);
  color: var(--bc-text);
}

.construction-banner-content {
  max-width: 1200px;
  margin: 0 auto;
}

.construction-banner-icon {
  font-size: 1.25rem;
  margin-top: 0.15rem;
}

.construction-banner-title {
  font-weight: 700;
  margin: 0 0 0.25rem 0;
}

.construction-banner-text {
  margin: 0;
}

.construction-banner-close {
  background: none;
  border: none;
  color: var(--bc-text);
  cursor: pointer;
  flex-shrink: 0;
  font-size: 1.1rem;
  line-height: 1;
  padding: 0.25rem;
}

.construction-banner-close:hover {
  opacity: 0.7;
}
</style>
