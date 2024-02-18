<script lang="ts">
  import InfoBlock from "$state/Desktop/Components/ProcessRenderer/Window/InfoBlock.svelte";
  import InfoRow from "$state/Desktop/Components/ProcessRenderer/Window/InfoBlock/InfoRow.svelte";
  import Segment from "$state/Desktop/Components/ProcessRenderer/Window/InfoBlock/Row/Segment.svelte";
  import { App } from "$types/app";
  import { AppInfoRuntime } from "../ts/runtime";

  export let target: App;
  export let runtime: AppInfoRuntime;

  function singleInstanceHelp() {
    runtime.singleInstanceDialog();
  }

  function loadConditionHelp() {
    runtime.loadConditionDialog();
  }
</script>

<InfoBlock>
  <InfoRow>
    <Segment title="Size">
      {target.size.w || "FIT"}x{target.size.h || "FIT"}
    </Segment>
    <Segment title="Minimal Size">
      {target.minSize.w || "FIT"}x{target.minSize.h || "FIT"}
    </Segment>
    <Segment title="Maximal Size">
      {target.maxSize.w || "FIT"}x{target.maxSize.h || "FIT"}
    </Segment>
    <Segment title="Controls" right>
      <div class="controls">
        <button
          class="min material-icons-round titlebar-control reset"
          disabled={!target.controls.minimize}
        >
          minimize
        </button>
        <button
          class="max material-icons-round titlebar-control reset"
          disabled={!target.controls.maximize}
        >
          crop_square
        </button>
        <button
          class="close material-icons-round titlebar-control reset"
          disabled={!target.controls.close}
        >
          close
        </button>
      </div>
    </Segment>
  </InfoRow>
  <InfoRow>
    <Segment title="Initial Position">
      {target.pos.x}, {target.pos.y}
    </Segment>
    <Segment title="Type">
      {target.sideload ? "Sideloaded" : "Built-in"}
    </Segment>
    <Segment title="Core">
      {target.metadata.core ? "Yes" : "No"}
    </Segment>
    <Segment title="Single Instance" help={singleInstanceHelp}>
      {target.singleInstance ? "Yes" : "No"}
    </Segment>
  </InfoRow>
  {#if target.loadCondition}
    <InfoRow>
      <Segment title="Load Condition" help={loadConditionHelp}>
        <code>
          {target.loadCondition}
        </code>
      </Segment>
    </InfoRow>
  {/if}
</InfoBlock>
