<script setup lang="ts">
import { onMounted } from 'vue';

import { Spinner } from '@/components/layout';
import { useAuthStore } from '@/store';

const authStore = useAuthStore();

onMounted(() => {
  authStore.login();
});
</script>

<template>
  <div class="flex flex-col items-center mt-10">
    <h2>Logging in...</h2>
    <Spinner />
  </div>
</template>

<style lang="scss" scoped>
.p-progress-spinner {
  display: flex;
  margin-top: 4rem;
  position: relative;
}
</style>
