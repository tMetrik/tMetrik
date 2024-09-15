<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";

interface $$Props extends HTMLAttributes<HTMLDivElement> {}
</script>

<div {...$$restProps}>
	<slot />
</div>

<style>
div {
  font-size: 32px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
