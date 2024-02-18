<script lang="ts">
  import InfoBlock from "$state/Desktop/Components/ProcessRenderer/Window/InfoBlock.svelte";
  import InfoRow from "$state/Desktop/Components/ProcessRenderer/Window/InfoBlock/InfoRow.svelte";
  import Segment from "$state/Desktop/Components/ProcessRenderer/Window/InfoBlock/Row/Segment.svelte";
  import { spawnApp } from "$ts/apps";
  import { ProcessStack } from "$ts/stores/process";

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

<InfoBlock>
  <InfoRow>
    <Segment title="Processes">
      {count} instance(s)
    </Segment>
    <Segment title="First PID">
      {pid < 0 ? "None" : pid}
    </Segment>
    <button class="action" on:click={procMan}>Processes</button>
  </InfoRow>
</InfoBlock>
