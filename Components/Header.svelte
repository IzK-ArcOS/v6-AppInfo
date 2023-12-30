<script lang="ts">
  import { spawnApp } from "$ts/apps";
  import { App } from "$types/app";

  export let target: App;
  export let id: string;

  function launch() {
    spawnApp(id);
  }
</script>

<div class="header">
  <div class="left">
    <img src={target.metadata.icon} alt="" />
    <div class="base-info">
      <p class="name">{target.metadata.name}</p>
      <p class="author">{target.metadata.author}</p>
    </div>
  </div>
  <div class="right">
    <button class="disable" disabled>Disable</button>
    <button class="material-icons-round" on:click={launch}>launch</button>
  </div>
</div>
