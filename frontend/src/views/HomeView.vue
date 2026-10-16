<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { CalloutSection, FeatureCard, PageHero } from '@/components/content';
// import UnderConstructionBanner from '@/components/UnderConstructionBanner.vue';
import { useAuthStore } from '@/store';
import { RouteNames } from '@/utils/constants';

const { getIsAuthenticated } = storeToRefs(useAuthStore());

// TODO(content): confirm the reporting structure, top to bottom (seeded from existing site copy and AI Hub tags)
const orgLevels = [
  { level: 'Ministry', name: "Ministry of Citizens' Services (CITZ)" },
  { level: 'Organization', name: 'Connected Services BC (CSBC)' },
  { level: 'Division', name: 'Economic Opportunities Division' },
  { level: 'Our team', name: 'Common AI Services and Products (CAPS)', current: true }
];

// TODO(content): draft values distilled from the previous Home page copy; review
const values = [
  {
    icon: 'lock',
    title: 'Secure by Design',
    description: 'Departmental data stays isolated and protected, even on a shared government platform.'
  },
  {
    icon: 'clone',
    title: 'Reuse Over Rebuild',
    description:
      "Shared products and infrastructure mean teams don't build, host and support the same AI foundations twice."
  },
  {
    icon: 'check-circle',
    title: 'Responsible and Compliant',
    description:
      'Privacy, security, auditing and cost management are built in from the start, with monitoring and usage tracking for every service.'
  },
  {
    icon: 'chart-line',
    title: 'Built to Scale',
    description: 'Services that grow with data volumes, users and new AI use cases across ministries.'
  },
  {
    icon: 'users',
    title: 'Shared Innovation',
    description: 'Collaboration across ministries, with the governance and control each program needs.'
  }
];

const services = [
  {
    icon: 'file-edit',
    title: 'AI Form Assist',
    to: { name: RouteNames.AI_FORM_ASSIST },
    requiresAuth: false,
    description:
      'An AI assistant for government web forms: plain-language answers, smart validation and suggested field values.'
  },
  {
    icon: 'server',
    title: 'AI Services Hub',
    to: { name: RouteNames.AI_SERVICES_HUB },
    requiresAuth: false,
    description: 'A secure gateway to enterprise AI services for teams building their own AI solutions.'
  }
];
</script>

<template>
  <div>
    <!-- <div class="full-bleed -mt-6">
      <UnderConstructionBanner />
    </div> -->

    <div class="w-full max-w-[75rem]">
      <PageHero title="AI Services to support your next project">
        Accelerate AI adoption with a secure, scalable, government-managed platform designed to help ministries and
        program areas build AI-powered solutions.
        <template #actions>
          <a
            href="#services"
            class="btn btn-primary"
          >
            Our Services
          </a>
          <router-link
            :to="{ name: RouteNames.CONTACT }"
            class="btn btn-secondary"
          >
            Contact Us
          </router-link>
        </template>
      </PageHero>

      <section class="border-t border-[var(--bc-border)] py-4">
        <h2>Who We Are</h2>
        <p class="mt-2 text-[var(--bc-text)]">
          We are the Common AI Products and Services (CAPS) team, in the Economic Opportunities Division of CSBC.
        </p>
        <!-- Stacked on small screens; a row of equal boxes from md up, with connectors drawn in the gaps -->
        <ol class="mt-6 flex list-none flex-col items-center p-0 md:flex-row md:items-stretch md:gap-6">
          <li
            v-for="(org, index) in orgLevels"
            :key="org.name"
            class="relative flex w-full flex-col items-center md:flex-1"
          >
            <div
              v-if="index > 0"
              class="h-6 w-px bg-[var(--bc-border-medium)] md:absolute md:top-1/2 md:right-full md:h-px md:w-6"
              aria-hidden="true"
            />
            <div
              class="w-full max-w-sm rounded px-6 py-3 text-center text-[var(--bc-text)] md:flex md:max-w-none md:grow md:flex-col md:justify-center md:px-4"
              :class="
                org.current
                  ? 'border-2 border-[var(--bc-gold)] bg-[var(--bc-surface-light)] font-bold'
                  : 'border border-[var(--bc-border)] bg-white'
              "
            >
              <span class="block text-xs font-normal uppercase tracking-wide text-[var(--bc-text-secondary)]">
                {{ org.level }}
              </span>
              {{ org.name }}
            </div>
          </li>
        </ol>
      </section>

      <section class="border-t border-[var(--bc-border)] py-4">
        <h2>Our Vision</h2>
        <!-- TODO(content): draft vision seeded from the previous "What is the AI Common Service?" copy; review -->
        <p class="mt-2 text-[var(--bc-text)]">
          Every ministry and program area should be able to use AI safely and quickly, without building it from scratch.
          We provide enterprise AI capabilities as shared, government-managed products and services. Instead of building
          and maintaining separate AI infrastructure, teams use secure, multi-tenant services for document search,
          knowledge retrieval, form assistance and other AI-enabled use cases, while meeting government security,
          privacy, and compliance requirements.
        </p>
        <!-- <div class="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FeatureCard
            icon="box"
            title="Common AI Products"
          >
            Ready-to-use products, like AI Form Assist, that plug into existing government services.
          </FeatureCard>
          <FeatureCard
            icon="server"
            title="Common AI Services"
          >
            A secure, shared platform, the AI Services Hub, where teams build their own AI solutions.
          </FeatureCard>
        </div> -->
      </section>

      <section class="border-t border-[var(--bc-border)] py-4">
        <h2>Design Principles</h2>
        <div class="mt-4 flex flex-col gap-4">
          <FeatureCard
            v-for="value in values"
            :key="value.title"
            :icon="value.icon"
            :title="value.title"
            compact
          >
            {{ value.description }}
          </FeatureCard>
        </div>
      </section>

      <section
        id="services"
        class="border-t border-[var(--bc-border)] py-4"
      >
        <h2>Featured Services</h2>
        <div class="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FeatureCard
            v-for="service in services"
            :key="service.title"
            :icon="service.icon"
            :title="service.title"
            :to="service.to"
            :locked="service.requiresAuth && !getIsAuthenticated"
          >
            {{ service.description }}
          </FeatureCard>
        </div>
      </section>

      <CalloutSection title="Ready to Explore AI for Your Program Area?">
        <p class="mt-2 text-[var(--bc-text)]">
          Whether you are evaluating an AI opportunity, building a proof of concept, or scaling an existing solution,
          the AI Common Service provides a secure foundation for government AI initiatives.
        </p>
        <router-link
          :to="{ name: RouteNames.CONTACT }"
          class="btn btn-primary mt-4"
        >
          Contact Us
        </router-link>
      </CalloutSection>
    </div>
  </div>
</template>
