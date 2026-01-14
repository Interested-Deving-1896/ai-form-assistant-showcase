<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { Spinner } from '@/components/layout';
import { useAuthStore } from '@/store';

const authStore = useAuthStore();
const router = useRouter();

onMounted(async () => {
  if (authStore.getIsAuthenticated) await authStore.logout();

  // Return user back to home page
  router.replace('/');
});
</script>

<template>
  <div class="flex flex-column align-items-center mt-10">
    <h2>Logging out...</h2>
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
