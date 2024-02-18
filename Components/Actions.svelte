<script lang="ts">
  import InfoBlock from "$state/Desktop/Components/ProcessRenderer/Window/InfoBlock.svelte";
  import InfoRow from "$state/Desktop/Components/ProcessRenderer/Window/InfoBlock/InfoRow.svelte";
  import { isDisabled } from "$ts/apps/disable/utils";
  import { killAllAppInstances } from "$ts/process/kill";
  import { UserDataStore } from "$ts/stores/user";
  import { AppInfoRuntime } from "../ts/runtime";

  export let id: string;
  export let runtime: AppInfoRuntime;

  let disabled = false;

  UserDataStore.subscribe(() => (disabled = isDisabled(id)));

  function killAll() {
    killAllAppInstances(id);
  }

  function close() {
    runtime.process.handler.kill(runtime.process.pid, true);
  }
</script>

<InfoBlock className="actions">
  <InfoRow>
    <p class="id">{id}</p>

    <button on:click={killAll} {disabled}>Kill all</button>
    <button class="suggested" on:click={close}>Close</button>
  </InfoRow>
</InfoBlock>
