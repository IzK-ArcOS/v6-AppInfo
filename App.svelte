<script lang="ts">
  import Actions from "./Components/Actions.svelte";
  import Header from "./Components/Header.svelte";
  import IndepthInfo from "./Components/IndepthInfo.svelte";
  import ProcessInfo from "./Components/ProcessInfo.svelte";
  import "./css/main.css";
  import { AppInfoRuntime } from "./ts/runtime";

  export let runtime: AppInfoRuntime;

  const { _targetApp: target, _targetId: id } = runtime;
</script>

{#if $id && $target}
  <Header target={$target} id={$id} />
  <IndepthInfo {runtime} target={$target} />
  <ProcessInfo id={$id}></ProcessInfo>
  <Actions id={$id} {runtime}></Actions>
{/if}
