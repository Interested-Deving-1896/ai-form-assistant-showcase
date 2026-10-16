<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { CalloutSection, FeatureCard, PageHero } from '@/components/content';
import UnderConstructionBanner from '@/components/UnderConstructionBanner.vue';
import { useAuthStore } from '@/store';
import { RouteNames } from '@/utils/constants';

const { getIsAuthenticated } = storeToRefs(useAuthStore());

// TODO(content): confirm the reporting structure, top to bottom (seeded from existing site copy and AI Hub tags)
const orgLevels = [
  { level: 'Ministry', name: "Ministry of Citizens' Services (CITZ)" },
  { level: 'Organization', name: 'CSBC' },
  { level: 'Division', name: 'Economic Opportunities Division' },
  { level: 'Our team', name: 'AI Common Service', current: true }
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

// TODO(content): replace with the team's actual roles, names and responsibilities
const teamRoles = [
  { icon: 'user', title: '[Product Owner]', description: '[Name, and what this role is responsible for]' },
  { icon: 'sitemap', title: '[Technical Lead]', description: '[Name, and what this role is responsible for]' },
  { icon: 'code', title: '[AI Developer]', description: '[Name, and what this role is responsible for]' },
  { icon: 'cloud', title: '[Cloud and Platform]', description: '[Name, and what this role is responsible for]' }
];

const services = [
  {
    icon: 'file-edit',
    title: 'AI Form Assist',
    to: { name: RouteNames.AI_FORM_ASSIST },
    description:
      'An AI assistant for government web forms: plain-language answers, smart validation and suggested field values.'
  },
  {
    icon: 'desktop',
    title: 'AI Form Assist Demo',
    to: { name: RouteNames.AI_FORM_ASSIST_DEMO },
    requiresAuth: true,
    description: 'Try the assistant on a sample fishing licence application.'
  },
  {
    icon: 'file',
    title: 'CHEFS Demo',
    to: { name: RouteNames.AI_FORM_ASSIST_CHEFS_DEMO },
    description: 'See AI Form Assist working inside a form built with CHEFS, the Common Hosted Forms Service.'
  },
  {
    icon: 'server',
    title: 'AI Services Hub',
    to: { name: RouteNames.AI_SERVICES_HUB },
    description: 'A secure gateway to enterprise AI services for teams building their own AI solutions.'
  }
];
</script>

<template>
  <div>
    <div class="full-bleed -mt-6">
      <UnderConstructionBanner />
    </div>

    <div class="w-full max-w-[1200px]">
      <PageHero title="A Practical Path to AI Adoption">
        Accelerate AI adoption with a secure, scalable, and government-managed platform designed to help ministries and
        program areas build AI-powered solutions faster.
        <template #actions>
          <a
            href="#services"
            class="btn btn-primary inline-block"
          >
            Our Services
          </a>
          <router-link
            :to="{ name: RouteNames.CONTACT }"
            class="btn btn-secondary inline-block"
          >
            Contact Us
          </router-link>
        </template>
      </PageHero>

      <section class="border-t border-[var(--bc-border)] py-4">
        <h3>Who We Are</h3>
        <p class="mt-2 text-[var(--bc-text)]">
          The AI Common Service is delivered by a team in the Economic Opportunities Division of CSBC.
          <!-- TODO(content): describe how the team works with other CSBC branches and teams -->
          [Add how the team works with other CSBC branches and teams.]
        </p>
        <ol class="mt-6 flex list-none flex-col items-center p-0">
          <li
            v-for="(org, index) in orgLevels"
            :key="org.name"
            class="flex w-full flex-col items-center"
          >
            <div
              v-if="index > 0"
              class="h-6 w-px bg-[var(--bc-border-medium)]"
              aria-hidden="true"
            />
            <div
              class="w-full max-w-sm rounded px-6 py-3 text-center text-[var(--bc-text)]"
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
        <h3>Our Vision</h3>
        <!-- TODO(content): draft vision seeded from the previous "What is the AI Common Service?" copy; review -->
        <p class="mt-2 text-[var(--bc-text)]">
          Every ministry and program area should be able to use AI safely and quickly, without building it from scratch.
          The AI Common Service provides enterprise AI capabilities as shared, government-managed products and services.
          Instead of building and maintaining separate AI infrastructure, teams use secure, multi-tenant services for
          document search, knowledge retrieval, form assistance and other AI-enabled use cases, while meeting government
          security, privacy, and compliance requirements.
        </p>
        <div class="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
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
        </div>
      </section>

      <section class="border-t border-[var(--bc-border)] py-4">
        <h3>Our Values</h3>
        <div class="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            v-for="value in values"
            :key="value.title"
            :icon="value.icon"
            :title="value.title"
          >
            {{ value.description }}
          </FeatureCard>
        </div>
      </section>

      <section class="border-t border-[var(--bc-border)] py-4">
        <h3>Team and Roles</h3>
        <div class="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            v-for="role in teamRoles"
            :key="role.title"
            :icon="role.icon"
            :title="role.title"
          >
            {{ role.description }}
          </FeatureCard>
        </div>
      </section>

      <section
        id="services"
        class="border-t border-[var(--bc-border)] py-4"
      >
        <h3>Our Services</h3>
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
          class="btn btn-primary mt-4 inline-block"
        >
          Contact Us
        </router-link>
      </CalloutSection>
    </div>
  </div>
</template>
