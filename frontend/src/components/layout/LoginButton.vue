<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

import { useAuthStore } from '@/store/authStore';
import { RouteNames } from '@/utils/constants';

const router = useRouter();

const authStore = useAuthStore();
const { getIsAuthenticated } = storeToRefs(authStore);

function login() {
  router.push({ name: RouteNames.LOGIN });
}

function logout() {
  router.push({ name: RouteNames.LOGOUT });
}
</script>

<template>
  <button
    v-if="!getIsAuthenticated"
    type="button"
    class="btn btn-secondary"
    @click="login()"
  >
    Log in
  </button>
  <button
    v-else
    type="button"
    class="btn btn-secondary"
    @click="logout()"
  >
    Log out
  </button>
</template>
