<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue';

import { PageHero } from '@/components/content';
// import DemoDisclaimerBanner from '@/components/DemoDisclaimerBanner.vue';
import WebForm from '@/components/WebForm.vue';
import WebFormResources from '@/components/WebFormResources.vue';
import WebFormInstructions from '@/components/WebFormInstructions.vue';
import { useConfigStore } from '@/store';

// Set per environment via FRONTEND_AIFAS_CLIENT_SRC
const AIFAS_CLIENT_SRC: string | undefined = useConfigStore().getConfig?.aifasClientSrc;

/**
 * @function getChatWidget
 * The client script appends its chat widget to <body> once and never removes it,
 * so it would otherwise stay on every page after leaving the demo.
 * @returns {HTMLElement | undefined} The widget container, if the client script has loaded
 */
function getChatWidget(): HTMLElement | undefined {
  const container = document.getElementById('wp-chat-modal')?.parentElement;
  return container?.parentElement === document.body ? container : undefined;
}

onBeforeUnmount(() => {
  const widget = getChatWidget();
  if (widget) widget.style.display = 'none';
});

onMounted(() => {
  // Re-show the widget when returning to the demo; the already-loaded script won't run again
  getChatWidget()?.style.removeProperty('display');

  if (!AIFAS_CLIENT_SRC) {
    // eslint-disable-next-line no-console
    console.error('AI Form Assistant client source is not configured (FRONTEND_AIFAS_CLIENT_SRC)');
    return;
  }

  if (!document.querySelector(`script[src="${AIFAS_CLIENT_SRC}"]`)) {
    const script = document.createElement('script');
    script.src = AIFAS_CLIENT_SRC;
    script.type = 'module';
    document.head.appendChild(script);
  }
});
</script>

<template>
  <div ai-mode>
    <!-- <div class="full-bleed -mt-6">
      <DemoDisclaimerBanner />
    </div> -->

    <PageHero title="AI Form Assist Demo">
      For this demo, we'll simulate the experience of someone applying for a
      <strong>fishing licence</strong>
      . For information on freshwater fishing
      <a
        href="https://www2.gov.bc.ca/gov/content/sports-culture/recreation/fishing-hunting/fishing/recreational-freshwater-fishing-licence"
        target="_blank"
      >
        licences
      </a>
      and fishing
      <a
        href="https://www2.gov.bc.ca/gov/content/sports-culture/recreation/fishing-hunting/fishing/fishing-regulations"
        target="_blank"
      >
        regulations
      </a>
      in B.C., refer to the
      <a
        href="https://www2.gov.bc.ca/gov/content?id=78F8FA0205454970B14CC3537F46829A"
        target="_blank"
      >
        Freshwater Fishing in B.C. webpages
      </a>
      .
    </PageHero>

    <!-- The form and resources start on the same line; resources drop below the form on small screens -->
    <div class="grid grid-cols-1 gap-8 pt-6 pb-30 lg:grid-cols-12">
      <div class="lg:col-span-8">
        <WebForm />
      </div>
      <div class="flex flex-col gap-8 lg:col-span-4">
        <WebFormResources />
        <WebFormInstructions />
      </div>
    </div>
  </div>
</template>
