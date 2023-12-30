<script lang="ts">
  import { Nullable } from "$types/common";

  export let title: string;
  export let help: Nullable<() => any> = null;
  export let right = false;
</script>

<div class="segment" class:right>
  <p class="title">
    {title}
    {#if help}
      <button class="help material-icons-round" on:click={help}>help</button>
    {/if}
  </p>
  <div class="value">
    <slot />
  </div>
</div>
