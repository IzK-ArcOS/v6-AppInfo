<script lang="ts">
  import { onMount } from "svelte";
  import { AppInfoRuntime } from "../ts/runtime";

  export let id: string;
  export let runtime: AppInfoRuntime;

  onMount(() => {});

  async function killAll() {
    const pids = runtime.process.handler.getAppPids(id);

    for (let i = 0; i < pids.length; i++) {
      await runtime.process.handler.kill(pids[i]);
    }
  }

  function close() {
    runtime.process.handler.kill(runtime.process.pid);
  }
</script>

<div class="info-block actions">
  <div class="row">
    <p class="id">{id}</p>

    <button on:click={killAll}>Kill all</button>
    <button class="suggested" on:click={close}>Close</button>
  </div>
</div>
