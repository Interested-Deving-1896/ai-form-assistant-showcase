<script setup lang="ts"></script>

<template>
  <div class="demo-disclaimer">
    <div class="demo-disclaimer-content flex gap-3 py-3 px-6 lg:px-16">
      <i class="pi pi-info-circle demo-disclaimer-icon" />
      <div>
        <p class="demo-disclaimer-title">Demonstration Only</p>
        <p class="demo-disclaimer-text">
          This webform is intended for demonstration of AI forms-assist
          <strong>only</strong>
          . It is not connected to any BC Gov permitting systems and
          <strong>does not replace or change</strong>
          existing licensing or permitting platforms. It is intended solely to showcase AI Forms-Assist capabilities.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-disclaimer {
  background-color: #fcba19;
  color: #2d2d2d;
}

.demo-disclaimer-content {
  max-width: 1600px;
  /* padding: 1rem 4.25rem; */
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
</style>
