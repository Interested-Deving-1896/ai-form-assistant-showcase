<script setup lang="ts"></script>
<template>
  <div class="w-full max-w-[1200px]">
    <section class="mt-4 border-l-4 border-[var(--bc-blue)] bg-[var(--bc-surface-light)] px-6 pt-2 pb-4">
      <h1>A Practical Path to AI Adoption</h1>
      <p class="mt-4 text-lg text-[var(--bc-text-secondary)]">
        Accelerate AI adoption with a secure, scalable, and government-managed platform designed to help ministries and
        program areas build AI-powered solutions faster.
      </p>
      <a
        href="#get-started"
        class="btn btn-primary mt-8 inline-block"
      >
        Learn More
      </a>
    </section>

    <section class="border-t border-[var(--bc-border)] py-10">
      <h2>What is the AI Common Service?</h2>
      <p class="mt-2 text-[var(--bc-text)]">
        The AI Common Service provides ministries and government teams with access to enterprise AI capabilities through
        a shared platform managed by the Economic Opportunities division within CSBC. Instead of building and
        maintaining separate AI infrastructure, teams can leverage a secure, multi-tenant environment that supports
        document search, knowledge retrieval, policy analysis, recruitment screening, and other AI-enabled use cases.
      </p>
      <p class="mt-4 text-[var(--bc-text)]">
        The platform combines advanced AI services with secure data management, enabling departments to innovate while
        meeting government security, privacy, and compliance requirements.
      </p>
    </section>

    <section class="border-t border-[var(--bc-border)] py-10">
      <h2>Benefits for Program Areas</h2>
      <div class="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div class="rounded border border-[var(--bc-border)] bg-white p-4 transition-shadow hover:shadow-lg">
          <div class="flex items-center gap-3">
            <div
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--bc-blue)] text-white"
            >
              <i class="pi pi-lock" />
            </div>
            <h5 class="m-0">Secure by Design</h5>
          </div>
          <p class="mt-2 text-[var(--bc-text)]">
            Departmental data remains isolated and protected while operating on a shared government platform.
          </p>
        </div>

        <div class="rounded border border-[var(--bc-border)] bg-white p-4 transition-shadow hover:shadow-lg">
          <div class="flex items-center gap-3">
            <div
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--bc-blue)] text-white"
            >
              <i class="pi pi-bolt" />
            </div>
            <h5 class="m-0">Faster Time to Value</h5>
          </div>
          <p class="mt-2 text-[var(--bc-text)]">
            Access AI capabilities without having to build, host, or support complex infrastructure.
          </p>
        </div>

        <div class="rounded border border-[var(--bc-border)] bg-white p-4 transition-shadow hover:shadow-lg">
          <div class="flex items-center gap-3">
            <div
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--bc-blue)] text-white"
            >
              <i class="pi pi-dollar" />
            </div>
            <h5 class="m-0">Cost Effective</h5>
          </div>
          <p class="mt-2 text-[var(--bc-text)]">
            Shared infrastructure reduces duplication and allows departments to benefit from economies of scale.
          </p>
        </div>

        <div class="rounded border border-[var(--bc-border)] bg-white p-4 transition-shadow hover:shadow-lg">
          <div class="flex items-center gap-3">
            <div
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--bc-blue)] text-white"
            >
              <i class="pi pi-chart-line" />
            </div>
            <h5 class="m-0">Scalable</h5>
          </div>
          <p class="mt-2 text-[var(--bc-text)]">
            Support growing data volumes, users, and AI use cases across ministries.
          </p>
        </div>

        <div class="rounded border border-[var(--bc-border)] bg-white p-4 transition-shadow hover:shadow-lg">
          <div class="flex items-center gap-3">
            <div
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--bc-blue)] text-white"
            >
              <i class="pi pi-check-circle" />
            </div>
            <h5 class="m-0">Compliant</h5>
          </div>
          <p class="mt-2 text-[var(--bc-text)]">
            Built with government privacy, security, auditing, and operational requirements in mind.
          </p>
        </div>

        <div class="rounded border border-[var(--bc-border)] bg-white p-4 transition-shadow hover:shadow-lg">
          <div class="flex items-center gap-3">
            <div
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--bc-blue)] text-white"
            >
              <i class="pi pi-users" />
            </div>
            <h5 class="m-0">Shared Innovation</h5>
          </div>
          <p class="mt-2 text-[var(--bc-text)]">
            Enable collaboration across ministries while maintaining appropriate governance and control.
          </p>
        </div>
      </div>
    </section>

    <section class="border-t border-[var(--bc-border)] py-10">
      <h2>How It Works</h2>
      <ol class="mt-6 list-decimal space-y-2 pl-6 text-[var(--bc-text)]">
        <li>
          <strong>Onboard Your Team</strong>
          <br />
          Register your program area through the government onboarding process and establish access controls for your
          users.
        </li>
        <li>
          <strong>Upload Knowledge Sources</strong>
          <br />
          Add documents, reports, policies, procedures, and other approved content that will power your AI solution.
        </li>
        <li>
          <strong>Enable AI Search and Analysis</strong>
          <br />
          AI services generate embeddings and make your content searchable using contextual and semantic understanding.
        </li>
        <li>
          <strong>Build Business Solutions</strong>
          <br />
          Develop applications that support policy research, document retrieval, employee assistance, recruitment
          workflows, and other AI use cases.
        </li>
      </ol>
    </section>
    <section class="border-t border-[var(--bc-border)] py-10">
      <h2>Governance and Oversight</h2>
      <p class="mt-6 text-[var(--bc-text)]">
        The AI Common Service is operated by the Common Services Team and includes monitoring, audit logging, usage
        tracking, and cost management capabilities. Departments maintain control of their data while benefiting from
        shared infrastructure and enterprise AI services.
      </p>
    </section>

    <section
      id="get-started"
      class="my-10 rounded border-l-4 border-[var(--bc-gold)] bg-[var(--bc-surface-light)] p-6"
    >
      <h2>Ready to Explore AI for Your Program Area?</h2>
      <p class="mt-6 text-[var(--bc-text)]">
        Whether you are evaluating an AI opportunity, building a proof of concept, or scaling an existing solution, the
        AI Common Service provides a secure foundation for government AI initiatives.
      </p>
      <a
        href="/contact"
        class="btn btn-primary mt-6 inline-block"
      >
        Request an Engagement
      </a>
    </section>
  </div>
</template>
