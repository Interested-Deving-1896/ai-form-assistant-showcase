<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { Spinner } from '@/components/layout';
import { useAuthStore } from '@/store';
import { StorageKey } from '@/utils/constants';

const authStore = useAuthStore();
const router = useRouter();

onMounted(async () => {
  await authStore.loginCallback();

  // Return user back to original login entrypoint if specified
  const entrypoint = window.sessionStorage.getItem(StorageKey.AUTH);
  if (entrypoint) window.sessionStorage.removeItem(StorageKey.AUTH);
  router.replace(entrypoint || '/');
});
</script>

<template>
  <div class="flex flex-column align-items-center mt-10">
    <h2>Authorizing...</h2>
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
