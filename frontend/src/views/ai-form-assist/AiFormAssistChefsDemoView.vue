<script setup lang="ts">
import DemoDisclaimerBanner from '@/components/DemoDisclaimerBanner.vue';
import { PageHero } from '@/components/content';
import { Message } from '@/lib/primevue';
import { useConfigStore } from '@/store';
import { RouteNames } from '@/utils/constants';

// Set per environment via FRONTEND_CHEFS_DEMO_URL
const CHEFS_DEMO_URL: string | undefined = useConfigStore().getConfig?.chefsDemoUrl;

const thingsToTry = [
  "I'm 67 and live in BC. Which licence rate applies to me?",
  'How much is an eight-day licence for a non-resident Canadian?',
  'Do I need a Fish and Wildlife ID before I apply?'
];
</script>

<template>
  <div>
    <div class="full-bleed -mt-6">
      <DemoDisclaimerBanner />
    </div>

    <div class="w-full max-w-[1200px]">
      <PageHero title="AI Form Assist in CHEFS">
        See AI Form Assist working inside a form built with CHEFS, the BC Government's Common Hosted Forms Service. The
        CHEFS form loads the same lightweight client script used to add the assistant to any web form.
        <template
          v-if="CHEFS_DEMO_URL"
          #actions
        >
          <a
            :href="CHEFS_DEMO_URL"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-primary inline-block"
          >
            Open the CHEFS Demo
            <i
              class="pi pi-external-link ml-1"
              aria-hidden="true"
            />
          </a>
        </template>
      </PageHero>
      <p
        v-if="CHEFS_DEMO_URL"
        class="mt-2 text-sm text-[var(--bc-text-secondary)]"
      >
        Opens in a new tab. You'll need to log in to CHEFS with your IDIR or BCeID.
      </p>
      <Message
        v-else
        severity="info"
        class="mt-4"
      >
        The CHEFS demo isn't available in this environment.
      </Message>

      <section class="mt-6 border-t border-[var(--bc-border)] py-4">
        <h3>What You'll See</h3>
        <p class="mt-2 text-[var(--bc-text)]">
          A fishing licence application built in CHEFS, with the AI Form Assist assistant alongside it. Ask questions as
          you fill in the form: the assistant answers from approved program content and can suggest values for fields.
        </p>
        <!--
          TODO(content): add a screenshot of the CHEFS form with the assistant open at src/assets/images/chefs-demo.png,
          then replace this placeholder with a DiagramFigure that imports it.
        -->
        <div
          class="mt-6 flex items-center justify-center rounded border border-dashed border-[var(--bc-border)] bg-white p-10 text-[var(--bc-text-secondary)]"
        >
          [Screenshot of the CHEFS form with AI Form Assist open]
        </div>
      </section>

      <section class="border-t border-[var(--bc-border)] py-4">
        <h3>Things to Try</h3>
        <ul class="mt-4 list-disc space-y-2 pl-6 text-[var(--bc-text)]">
          <li
            v-for="question in thingsToTry"
            :key="question"
          >
            "{{ question }}"
          </li>
        </ul>
      </section>

      <section class="border-t border-[var(--bc-border)] py-4">
        <h3>How It's Set Up</h3>
        <p class="mt-2 text-[var(--bc-text)]">
          The CHEFS form is onboarded as its own AI Form Assist tenant, with its own client profile, form definition,
          and prompts, following the same process as any program.
          <router-link :to="{ name: RouteNames.AI_FORM_ASSIST_ONBOARDING }">Learn about onboarding</router-link>
        </p>
      </section>
    </div>
  </div>
</template>
