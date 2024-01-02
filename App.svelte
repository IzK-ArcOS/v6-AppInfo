<script lang="ts">
  import { App } from "$types/app";
  import { onMount } from "svelte";
  import Actions from "./Components/Actions.svelte";
  import Header from "./Components/Header.svelte";
  import IndepthInfo from "./Components/IndepthInfo.svelte";
  import ProcessInfo from "./Components/ProcessInfo.svelte";
  import "./css/main.css";
  import { AppInfoRuntime } from "./ts/runtime";

  export let runtime: AppInfoRuntime;

  let id: string;
  let target: App;

  onMount(() => {
    runtime._targetApp.subscribe((v) => (target = v));
    runtime._targetId.subscribe((v) => (id = v));
  });
</script>

{#if id && target}
  <Header {target} {id} />
  <IndepthInfo {target} {id} />
  <ProcessInfo {id}></ProcessInfo>
  <Actions {id} {runtime}></Actions>
{/if}
