<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useAuthStore, useConfigStore } from '@/store';

// Store
const { getAccessToken, getProfile } = storeToRefs(useAuthStore());
const { getConfig } = storeToRefs(useConfigStore());
</script>

<template>
  <h2>Developer</h2>
  <div>
    <div class="flex mt-4">
      <h3>Config</h3>
    </div>
    {{ getConfig }}

    <div class="flex mt-4">
      <h3>Token</h3>
    </div>

    <div class="wrap-block">
      {{ getAccessToken }}
    </div>

    <div class="flex mt-4">
      <h3>Profile</h3>
    </div>
    {{ getProfile }}
  </div>
</template>

<style lang="scss" scoped>
h3 {
  margin-top: 1em;
}
</style>
