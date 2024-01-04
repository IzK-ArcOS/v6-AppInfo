<script lang="ts">
  import { killAllAppInstances } from "$ts/process/kill";
  import { AppInfoRuntime } from "../ts/runtime";

  export let id: string;
  export let runtime: AppInfoRuntime;

  function killAll() {
    killAllAppInstances(id);
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
