<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useAuthStore, useConfigStore } from '@/store';

// Store
const { getAccessToken, getProfile } = storeToRefs(useAuthStore());
const { getConfig } = storeToRefs(useConfigStore());
</script>

<template>
  <h1>Developer</h1>
  <div>
    <div class="flex mt-4">
      <h2>Config</h2>
    </div>
    {{ getConfig }}

    <div class="flex mt-4">
      <h2>Token</h2>
    </div>

    <div class="wrap-block">
      {{ getAccessToken }}
    </div>

    <div class="flex mt-4">
      <h2>Profile</h2>
    </div>
    {{ getProfile }}
  </div>
</template>

<style lang="scss" scoped>
h2 {
  margin-top: 1em;
}
</style>
