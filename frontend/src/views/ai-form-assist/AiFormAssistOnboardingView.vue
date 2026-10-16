<script setup lang="ts">
import { CalloutSection, PageHero, ProcessSteps } from '@/components/content';
import { RouteNames } from '@/utils/constants';

const goodFitSignals = [
  'Complex application forms or permit processes',
  'Frequent applicant questions before submission',
  'High rates of incomplete or unclear applications',
  'Program rules that can be explained using approved guidance',
  'Staff time spent following up for missing information',
  'A need to improve applicant experience without rebuilding the full system'
];

// TODO(content): confirm who prepares each item
const requirements = [
  {
    item: 'Your web form',
    purpose:
      'A page where one script tag can be added, plus its exact web addresses. Only approved addresses can use your assistant.',
    preparedBy: 'Your team'
  },
  {
    item: 'Approved knowledge content',
    purpose:
      'The web pages, PDFs, and policy documents the assistant answers from. They are indexed in Azure AI Search.',
    preparedBy: 'Your team'
  },
  {
    item: 'A walkthrough of each form step',
    purpose:
      "The fields, options, and rules on each step. These become one form definition per step, so field IDs must match the IDs or names in your page's HTML.",
    preparedBy: 'Together'
  },
  {
    item: 'Step guidance',
    purpose:
      "What applicants typically ask on each step. This becomes a prompt template for the step. Agent instructions start from an existing tenant's.",
    preparedBy: 'Together'
  },
  {
    item: 'Calculations (optional)',
    purpose:
      'Business rules such as fee calculations. Existing tools cover livestock water use and fishing licence fees; a new calculation needs development work.',
    preparedBy: 'Together'
  },
  {
    item: 'Support contact and reviewers',
    purpose:
      "Your own wording for when the assistant can't answer, with your support contact, and a subject-matter expert to review answers during testing.",
    preparedBy: 'Your team'
  }
];

const onboardingSteps = [
  {
    title: 'Intake',
    description: 'Contact us to talk through your form, your applicants, and what you want the assistant to help with.'
  },
  {
    title: 'Discovery and scope',
    description:
      'Together we walk through the form and your content, and agree which steps, knowledge sources, and calculations are in scope.'
  },
  {
    title: 'Content preparation',
    description: 'Your knowledge sources are indexed, and the form definitions and prompts are written for each step.'
  },
  {
    title: 'Tenant setup',
    description:
      "We create your client profile, with your client ID, approved web addresses, and enabled agents, and publish your tenant's client script."
  },
  {
    title: 'Integrate and test',
    description:
      "You add the script tag to your form's development environment. Subject-matter experts test the answers while we tune the prompts."
  },
  {
    title: 'Go live',
    description: 'Your configuration is promoted to the test environment, then to production.'
  }
];

// The closing tag is split so it doesn't end this <script> block
const integrationSnippet = [
  '<script type="module"',
  '  src="https://<client-script-host>/scripts/tenants/<tenant>/client.js"></' + 'script>',
  '',
  '<div ai-mode>',
  '  <!-- your form -->',
  '</div>'
].join('\n');
</script>

<template>
  <div class="w-full max-w-[1200px]">
    <PageHero title="Onboarding to AI Form Assist">
      Bring AI-powered guidance to your program's application forms. Here's what you'll need and how onboarding works.
      <template #actions>
        <router-link
          :to="{ name: RouteNames.CONTACT }"
          class="btn btn-primary inline-block"
        >
          Contact Us
        </router-link>
      </template>
    </PageHero>

    <section class="border-t border-[var(--bc-border)] py-4">
      <h3>Is This a Good Fit for Your Program?</h3>
      <p class="mt-2 font-semibold text-[var(--bc-blue)]">AI Form Assist may be a good fit if your program has:</p>
      <ul class="mt-4 list-disc space-y-2 pl-6 text-[var(--bc-text)]">
        <li
          v-for="signal in goodFitSignals"
          :key="signal"
        >
          {{ signal }}
        </li>
      </ul>
    </section>

    <section class="border-t border-[var(--bc-border)] py-4">
      <h3>What You'll Bring</h3>
      <div class="mt-4 overflow-x-auto">
        <table class="w-full border-collapse text-left text-[var(--bc-text)]">
          <thead>
            <tr class="border-b-2 border-[var(--bc-border-medium)]">
              <th class="py-2 pr-4">What</th>
              <th class="py-2 pr-4">Why it's needed</th>
              <th class="whitespace-nowrap py-2">Prepared by</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in requirements"
              :key="row.item"
              class="border-b border-[var(--bc-border)] align-top"
            >
              <td class="py-3 pr-4 font-bold">{{ row.item }}</td>
              <td class="py-3 pr-4">{{ row.purpose }}</td>
              <td class="whitespace-nowrap py-3">{{ row.preparedBy }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="border-t border-[var(--bc-border)] py-4">
      <h3>How Onboarding Works</h3>
      <ProcessSteps :steps="onboardingSteps" />
    </section>

    <section class="border-t border-[var(--bc-border)] py-4">
      <h3>For Developers</h3>
      <p class="mt-2 text-[var(--bc-text)]">
        Integration is one script tag on each page of your form, plus an
        <code>ai-mode</code>
        attribute on the element that contains the form. Your tenant's script address is provided during tenant setup.
      </p>
      <pre><code>{{ integrationSnippet }}</code></pre>
    </section>

    <CalloutSection title="Ready to Get Started?">
      <p class="mt-2 text-[var(--bc-text)]">Contact us to begin the intake conversation.</p>
      <router-link
        :to="{ name: RouteNames.CONTACT }"
        class="btn btn-primary mt-4 inline-block"
      >
        Contact Us
      </router-link>
    </CalloutSection>
  </div>
</template>
