<script setup lang="ts">
import { FeatureCard, PageHero } from '@/components/content';

// TODO(content): replace with the real Teams channels. Get each `href` from the channel's "Get link to channel" menu

const teamsChannels: Array<{ name: string; href: string }> = [
  {
    name: 'AI Form Assist',
    href: 'https://teams.microsoft.com/l/channel/19%3Aab94f660285e4da59a1c9ca01cd10e18%40thread.tacv2/AIFA%20(AI%20Forms-Assist)?groupId=bef8086f-20c7-43a4-bd07-29ce764e818c&tenantId=6fdb5200-3d0d-4a8a-b036-d3685e359adc'
  },
  {
    name: 'AI Services Hub',
    href: 'https://teams.microsoft.com/l/channel/19%3Aafeab8ec5bbd4597b55388aa7cf55c49%40thread.tacv2/AI%20Services%20Hub?groupId=bef8086f-20c7-43a4-bd07-29ce764e818c&tenantId=6fdb5200-3d0d-4a8a-b036-d3685e359adc'
  },
  {
    name: 'General Enquiries',
    href: 'https://teams.microsoft.com/l/channel/19%3AqztmPpuePgw_2JUN20Q41vhFSP0RNuu1aSal0br0WxY1%40thread.tacv2/General?groupId=bef8086f-20c7-43a4-bd07-29ce764e818c&tenantId=6fdb5200-3d0d-4a8a-b036-d3685e359adc'
  }
];
</script>

<template>
  <div class="w-full max-w-[75rem]">
    <PageHero title="Contact Us">
      Talk to the Common AI Products and Services (CAPS) team about AI Form Assist, the AI Services Hub, or an AI
      opportunity in your program area.
    </PageHero>

    <section class="border-t border-[var(--bc-border)] py-4">
      <h3>Microsoft Teams Channels</h3>
      <div class="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <FeatureCard
          v-for="channel in teamsChannels"
          :key="channel.name"
          icon="comments"
          :title="channel.name"
          :href="channel.href"
        />
      </div>
    </section>

    <section class="border-t border-[var(--bc-border)] py-4">
      <h3>Email</h3>
      <!-- TODO(content): confirm the mailbox; package.json lists NR.CommonServiceShowcase@gov.bc.ca instead -->
      <p class="mt-2 text-[var(--bc-text)]">
        If you prefer a more private way to reach us, email us at
        <a href="mailto:NRM.CommonServiceShowcase@gov.bc.ca">NRM.CommonServiceShowcase@gov.bc.ca</a>
      </p>
    </section>
  </div>
</template>
