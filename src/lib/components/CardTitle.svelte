<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";

interface $$Props extends HTMLAttributes<HTMLDivElement> {
}
</script>

<div {...$$restProps}>
	<slot />
</div>

<style>
div {
  font-size: 12px;
}
</style>
