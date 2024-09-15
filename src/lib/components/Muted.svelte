<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";

interface $$Props extends HTMLAttributes<HTMLSpanElement> {}
</script>

<span {...$$restProps}><slot /></span>

<style>
span {
  opacity: 0.25;
}
</style>
