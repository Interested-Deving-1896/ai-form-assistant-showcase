<script setup lang="ts">
import { onMounted } from 'vue';

import DemoDisclaimerBanner from '@/components/DemoDisclaimerBanner.vue';
import WebForm from '@/components/WebForm.vue';

const AIFAS_CLIENT_SRC = '/aifas-client-scripts/client.js';

onMounted(() => {
  if (!document.querySelector(`script[src="${AIFAS_CLIENT_SRC}"]`)) {
    const script = document.createElement('script');
    script.src = AIFAS_CLIENT_SRC;
    document.head.appendChild(script);
  }
});
</script>

<template>
  <div
    ai-mode
    class="-mx-6 lg:-mx-16 -my-6 lg:-my-6"
  >
    <DemoDisclaimerBanner />

    <div class="px-6 lg:px-16 w-full max-w-[1600px] pb-30">
      <WebForm />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
