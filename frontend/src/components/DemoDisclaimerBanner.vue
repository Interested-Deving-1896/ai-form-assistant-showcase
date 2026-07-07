<script setup lang="ts">
import { ref } from 'vue';

const isVisible = ref(true);
</script>

<template>
  <div
    v-if="isVisible"
    class="demo-disclaimer"
  >
    <div class="demo-disclaimer-content flex items-start gap-3 py-3 px-6 lg:px-16">
      <i class="pi pi-info-circle demo-disclaimer-icon" />
      <div class="grow">
        <p class="demo-disclaimer-title">Demonstration Only</p>
        <p class="demo-disclaimer-text">
          This webform is intended for demonstration of AI forms-assist
          <strong>only</strong>
          . It is not connected to any BC Gov permitting systems and
          <strong>does not replace or change</strong>
          existing licensing or permitting platforms. It is intended solely to showcase AI Forms-Assist capabilities.
        </p>
      </div>
      <button
        type="button"
        class="demo-disclaimer-close"
        aria-label="Close"
        @click="isVisible = false"
      >
        <i class="pi pi-times" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.demo-disclaimer {
  background-color: var(--bc-gold);
  color: var(--bc-text);
}

.demo-disclaimer-content {
  max-width: 1600px;
}

.demo-disclaimer-icon {
  font-size: 1.25rem;
  margin-top: 0.15rem;
}

.demo-disclaimer-title {
  font-weight: 700;
  margin: 0 0 0.25rem 0;
}

.demo-disclaimer-text {
  margin: 0;
}

.demo-disclaimer-close {
  background: none;
  border: none;
  color: var(--bc-text);
  cursor: pointer;
  flex-shrink: 0;
  font-size: 1.1rem;
  line-height: 1;
  padding: 0.25rem;
}

.demo-disclaimer-close:hover {
  opacity: 0.7;
}
</style>
