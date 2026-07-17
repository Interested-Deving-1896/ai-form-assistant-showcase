<script setup lang="ts">
import architectureDiagram from '@/assets/images/ai-form-assist-architecture.jpg';
</script>
<template>
  <div class="w-full max-w-[1200px]">
    <section class="mt-4 border-l-4 border-[var(--bc-blue)] bg-[var(--bc-surface-light)] py-2 px-6">
      <h1>AI Form-Assist Architecture</h1>
      <p class="mt-4 text-lg text-[var(--bc-text-secondary)]">
        A multi-tenant, AI-powered architecture that provides intelligent form assistance, conversational support, and
        reusable government services through a centralized orchestration platform.
      </p>
    </section>

    <section class="border-t border-[var(--bc-border)] py-4">
      <h3>Overview</h3>
      <p class="mt-6 text-[var(--bc-text)]">
        AI Form-Assist is designed as a scalable, multi-tenant architecture that enables organizations and government
        programs to deliver AI-assisted form completion experiences without modifying underlying business systems. The
        platform intelligently routes requests to specialized AI agents while maintaining customer-specific
        configurations, knowledge sources, and form definitions.
      </p>
    </section>

    <section class="border-t border-[var(--bc-border)] py-2">
      <h3>Architecture Diagram</h3>
      <div
        class="mt-6 flex items-center justify-center rounded border border-dashed border-[var(--bc-border)] bg-white p-10 text-sm text-[var(--bc-text-secondary)]"
      >
        <a
          :href="architectureDiagram"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            :src="architectureDiagram"
            alt="AI Service Architecture"
            class="max-h-[400px] object-contain"
          />
        </a>
      </div>
      <p class="mt-4 text-sm text-[var(--bc-text-secondary)]">
        High-level architecture showing tenant resolution, orchestration, AI agents, knowledge repositories, and
        form-definition services.
      </p>
    </section>

    <section class="border-t border-[var(--bc-border)] py-4">
      <h3>How It Works</h3>
      <ol class="mt-6 list-decimal space-y-2 pl-6 text-[var(--bc-text)]">
        <li>A client web application sends a request to the public API.</li>
        <li>
          The API identifies the requesting tenant by validating the client identifier against client profiles stored in
          Azure Cosmos DB. The profile contains configuration details such as allowed origins, enabled agents, content
          bindings, and service settings.
        </li>
        <li>The request, together with the resolved client context, is forwarded to the Orchestrator Agent.</li>
        <li>
          The Orchestrator analyzes the request and routes it to the most appropriate AI agent based on the user's
          intent.
        </li>
      </ol>
    </section>

    <section class="border-t border-[var(--bc-border)] pb-6">
      <h3>Orchestrator Agent</h3>
      <p class="mt-6 text-[var(--bc-text)]">
        The Orchestrator Agent serves as the central intelligence layer of the platform. It receives requests from the
        API, applies tenant-specific context, and directs user interactions to specialized AI agents. This approach
        enables consistent experiences while supporting multiple tenants and service configurations from a shared
        platform.
      </p>
    </section>

    <section class="border-t border-[var(--bc-border)] pb-6">
      <h3>Specialized AI Agents</h3>
      <div class="my-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div class="rounded border border-[var(--bc-border)] bg-white p-4 transition-shadow hover:shadow-lg">
          <div class="flex items-center gap-3">
            <div
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--bc-blue)] text-white"
            >
              <i class="pi pi-comments" />
            </div>
            <h5 class="m-0">Conversation Agent</h5>
          </div>
          <p class="mt-2 text-[var(--bc-text)]">
            Provides knowledge-based assistance, answers user questions, and supports conversational interactions using
            content grounded in the tenant's Azure AI Search index.
          </p>
        </div>

        <div class="rounded border border-[var(--bc-border)] bg-white p-4 transition-shadow hover:shadow-lg">
          <div class="flex items-center gap-3">
            <div
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--bc-blue)] text-white"
            >
              <i class="pi pi-file-edit" />
            </div>
            <h5 class="m-0">Form Support Agent</h5>
          </div>
          <p class="mt-2 text-[var(--bc-text)]">
            Assists users with form completion, field guidance, validation, and step-by-step application support using
            tenant-specific form definitions stored in Azure Blob Storage.
          </p>
        </div>
      </div>
    </section>

    <section class="border-t border-[var(--bc-border)] pb-6">
      <h3>Core Platform Components</h3>
      <div class="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div class="rounded border border-[var(--bc-border)] bg-white p-4 transition-shadow hover:shadow-lg">
          <div class="flex items-center gap-3">
            <div
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--bc-blue)] text-white"
            >
              <i class="pi pi-globe" />
            </div>
            <h5 class="m-0">Public API</h5>
          </div>
          <p class="mt-2 text-[var(--bc-text)]">Secure entry point for all client applications and user requests.</p>
        </div>

        <div class="rounded border border-[var(--bc-border)] bg-white p-4 transition-shadow hover:shadow-lg">
          <div class="flex items-center gap-3">
            <div
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--bc-blue)] text-white"
            >
              <i class="pi pi-database" />
            </div>
            <h5 class="m-0">Azure Cosmos DB</h5>
          </div>
          <p class="mt-2 text-[var(--bc-text)]">
            Stores tenant profiles, configuration settings, enabled agents, content bindings, and client-specific
            metadata.
          </p>
        </div>

        <div class="rounded border border-[var(--bc-border)] bg-white p-4 transition-shadow hover:shadow-lg">
          <div class="flex items-center gap-3">
            <div
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--bc-blue)] text-white"
            >
              <i class="pi pi-search" />
            </div>
            <h5 class="m-0">Azure AI Search</h5>
          </div>
          <p class="mt-2 text-[var(--bc-text)]">
            Provides Retrieval-Augmented Generation (RAG) capabilities for tenant-specific knowledge retrieval and
            conversational grounding.
          </p>
        </div>

        <div class="rounded border border-[var(--bc-border)] bg-white p-4 transition-shadow hover:shadow-lg">
          <div class="flex items-center gap-3">
            <div
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--bc-blue)] text-white"
            >
              <i class="pi pi-folder" />
            </div>
            <h5 class="m-0">Azure Blob Storage</h5>
          </div>
          <p class="mt-2 text-[var(--bc-text)]">
            Stores prompts, content assets, and form definitions used by the AI agents during processing.
          </p>
        </div>
      </div>
    </section>

    <section class="border-t border-[var(--bc-border)]">
      <h3>Key Benefits</h3>
      <ul class="mt-4 list-disc pl-6 text-[var(--bc-text)]">
        <li>Multi-tenant architecture supporting multiple clients and programs</li>
        <li>Centralized AI orchestration with specialized agent routing</li>
        <li>Reusable platform for conversational and form-assistance scenarios</li>
        <li>Tenant-specific knowledge bases and content management</li>
        <li>Scalable cloud-native architecture built on Azure services</li>
        <li>Separation of platform services, content, and business logic</li>
      </ul>
    </section>

    <section class="my-10 rounded border-l-4 border-[var(--bc-gold)] bg-[var(--bc-surface-light)] px-6 py-2">
      <h3>Architecture Summary</h3>
      <p class="mt-6 text-[var(--bc-text)]">
        AI Form-Assist combines tenant-aware orchestration, specialized AI agents, Azure AI Search, Cosmos DB, and Blob
        Storage into a single reusable platform. This architecture enables organizations to rapidly deploy intelligent
        form-assistance experiences while maintaining separation between client configurations, knowledge sources, and
        form definitions.
      </p>
    </section>
  </div>
</template>
