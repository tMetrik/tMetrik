<script lang="ts">
import clsx from "clsx";
import type { HTMLAttributes } from "svelte/elements";
import MoveableViewWrapper from "./MoveableViewWrapper.svelte";

interface $$Props extends HTMLAttributes<HTMLDivElement> {
	flexibleHeight?: boolean;
	compact?: boolean;
	static?: boolean;
	square?: boolean;
}

let {
	flexibleHeight,
	compact,
	static: static_,
	square,
	class: class_,
} = $$restProps as $$Props;
class_ = clsx(
	"card",
	flexibleHeight && "card_flexible",
	compact && "card_compact",
	square && "card_square",
	class_,
);
</script>

{#if static_}
	<div {...$$restProps} class={class_}><slot /></div>
{:else}
	<MoveableViewWrapper {...$$restProps} class={class_}><slot
		/></MoveableViewWrapper>
{/if}

<style>
:global(.card) {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  height: 100%;
  gap: 30px;
  padding: 20px;
  aspect-ratio: 16 / 9;
  min-height: 147.5px;
  max-height: 147.5px;
  background-color: var(--secondary);
  flex-shrink: 0;
  width: 100%;
  overflow: hidden;
}

:global(.card_flexible) {
  height: auto;
  aspect-ratio: unset;
  min-height: unset;
}

:global(.card_compact) {
  padding: 6px;
}

:global(.card_square) {
  min-height: 296px;
  max-height: 296px;
  height: auto;
  aspect-ratio: 1 / 1 !important;
}
</style>
