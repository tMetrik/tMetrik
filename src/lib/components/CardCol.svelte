<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";

interface $$Props extends HTMLAttributes<HTMLDivElement> {}
</script>

<div {...$$restProps}>
	<slot />
</div>

<style>
div {
  display: flex;
  flex-direction: column;
  width: 25%;
  flex-shrink: 0;
  min-width: 296px;
  overflow-y: auto;
  height: 100%;
  background-color: var(--background);
  gap: 1px;
}
</style>
