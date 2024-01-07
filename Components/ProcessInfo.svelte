<script lang="ts">
  import { spawnApp } from "$ts/apps";
  import { ProcessStack } from "$ts/stores/process";
  import Segment from "./IndepthInfo/Segment.svelte";

  export let id: string;

  let pid = -1;
  let count = 0;

  function update() {
    const pids = ProcessStack.getAppPids(id);

    count = pids.length;
    pid = pids.length ? pids[0] : -1;
  }

  function procMan() {
    spawnApp("ProcessManager");
  }

  ProcessStack.processes.subscribe(update);
</script>

<div class="info-block">
  <div class="row">
    <Segment title="Processes">
      {count} instance(s)
    </Segment>
    <Segment title="First PID">
      {pid < 0 ? "None" : pid}
    </Segment>
    <button class="action" on:click={procMan}>Processes</button>
  </div>
</div>
