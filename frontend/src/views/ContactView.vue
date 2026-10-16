<script setup lang="ts">
import { FeatureCard, PageHero } from '@/components/content';

// TODO(content): replace with the real Teams channels, and add `href: '<channel link>'` so each card opens its channel
const teamsChannels: Array<{ title: string; description: string; href?: string }> = [
  { title: '[AI Form Assist channel]', description: '[What to ask in this channel]' },
  { title: '[AI Services Hub channel]', description: '[What to ask in this channel]' },
  { title: '[AI Common Service community channel]', description: '[What to ask in this channel]' }
];
</script>

<template>
  <div class="w-full max-w-[1200px]">
    <PageHero title="Contact Us">
      Talk to the AI Common Service team about AI Form Assist, the AI Services Hub, or an AI opportunity in your program
      area.
    </PageHero>

    <section class="border-t border-[var(--bc-border)] py-4">
      <h3>Microsoft Teams Channels</h3>
      <div class="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <FeatureCard
          v-for="channel in teamsChannels"
          :key="channel.title"
          icon="comments"
          :title="channel.title"
          :href="channel.href"
        >
          {{ channel.description }}
        </FeatureCard>
      </div>
    </section>

    <section class="border-t border-[var(--bc-border)] py-4">
      <h3>Email</h3>
      <!-- TODO(content): confirm the mailbox; package.json lists NR.CommonServiceShowcase@gov.bc.ca instead -->
      <p class="mt-2 text-[var(--bc-text)]">
        For anything else, email us at
        <a href="mailto:NRM.CommonServiceShowcase@gov.bc.ca">NRM.CommonServiceShowcase@gov.bc.ca</a>
      </p>
    </section>
  </div>
</template>
