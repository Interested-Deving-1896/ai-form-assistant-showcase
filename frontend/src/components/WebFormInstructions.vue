<script setup></script>
<template>
  <aside
    class="instructions-panel"
    aria-labelledby="instructions-title"
  >
    <h2
      id="instructions-title"
      class="instructions-title"
    >
      Demo Instructions
    </h2>
    <div class="flex flex-col gap-2">
      <h6>AI capabilities</h6>
      <ul class="my-0">
        <li>Queries a knowledge source curated by the form-owner</li>
        <li>Form-filling based on user intent (partially implemented)</li>
        <li>MCP tool integration (work in progress)</li>
        <li>
          Access to more AI services provisioned via the
          <a
            href="https://bcgov.github.io/ai-hub-tracking/index.html"
            target="_blank"
          >
            AI Services Hub
          </a>
        </li>
      </ul>

      <h6>Suggested prompts</h6>
      <ul class="my-0">
        <li><i>"Do kids need a fishing licence?"</i></li>
        <li><i>"My WID is: 12345"</i></li>
        <li><i>"What is a Classified Water?"</i></li>
        <li><i>"I am an adult BC resident and I need a 1 day permit to fish for steelhead in the Fraser river"</i></li>
        <!--<li><i>"What is the estimated cost?"</i> (experimental)</li>-->
      </ul>
    </div>
  </aside>
</template>

<style scoped>
.instructions-panel {
  padding: var(--bcds-layout-padding-large);
  border: var(--bcds-layout-border-width-small) solid var(--bc-border);
  border-radius: var(--bcds-layout-border-radius-medium);
  background-color: var(--bc-surface-light);

  h6 {
    font-size: var(--bcds-typography-font-size-body);
  }
}

/* Heading 2 for the page outline, sized down to fit the sidebar */
.instructions-title {
  margin: 0 0 var(--bcds-layout-margin-medium);
  font-size: var(--bcds-typography-font-size-h5);
  line-height: var(--bcds-typography-line-heights-dense);
}
</style>
