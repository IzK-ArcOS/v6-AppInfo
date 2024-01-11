<script lang="ts">
  import { spawnApp } from "$ts/apps";
  import { disableApp, enableApp } from "$ts/apps/disable";
  import { isDisabled } from "$ts/apps/disable/utils";
  import { WarningIcon } from "$ts/images/dialog";
  import { UserDataStore } from "$ts/stores/user";
  import { App } from "$types/app";

  export let target: App;
  export let id: string;

  let disabled = false;

  UserDataStore.subscribe(() => (disabled = isDisabled(id)));

  function launch() {
    spawnApp(id);
  }

  function toggleDisable() {
    if (isDisabled(id)) enableApp(id);
    else disableApp(id);
  }
</script>

<div class="header">
  <div class="left">
    <img src={target.metadata.icon} alt="" />
    <div class="base-info">
      <p class="name">
        <span>{target.metadata.name}</span>
        {#if disabled}
          <img
            src={WarningIcon}
            alt=""
            class="disabled"
            title="{target.metadata.name} is disabled!"
          />
        {/if}
      </p>
      <p class="author">{target.metadata.author}</p>
    </div>
  </div>
  <div class="right">
    <button class="disable" class:disabled on:click={toggleDisable}>
      {disabled ? "Enable" : "Disable"}
    </button>
    <button class="material-icons-round" on:click={launch} {disabled}>
      launch
    </button>
  </div>
</div>
