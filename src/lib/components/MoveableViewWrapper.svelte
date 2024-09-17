<script lang="ts">
import {
	getState,
	startDragOver,
	stopDragOver,
	stopDragOverPos,
} from "$lib/config/1_view_states";
import { moveToBottom, moveToTop, swap } from "$lib/config/3_actions";
import { isDragging } from "$lib/stores";
import type { HTMLAttributes } from "svelte/elements";
import { getPosRecursive } from "./card_utils";

let draggedElement: HTMLElement | null = null;

interface $$Props extends HTMLAttributes<HTMLDivElement> {}

function onDragEnter(e: DragEvent) {
	if (!draggedElement) {
		return;
	}
	const div = e.currentTarget as HTMLDivElement;
	const { top: divY, height } = div.getBoundingClientRect();
	const pos = getPosRecursive(div);
	if (pos == null) {
		return;
	}
	startDragOver(pos, divY + height - e.pageY <= 20, e.pageY - divY <= 20);
}

function onDragOver(e: DragEvent) {
	const div = e.currentTarget as HTMLDivElement;
	const { top: divY, height } = div.getBoundingClientRect();
	const pos = getPosRecursive(div);
	if (pos == null) {
		return;
	}
	const diffBottom = divY + height - e.pageY;
	const diffTop = e.pageY - divY;
	startDragOver(pos, diffBottom <= 20, diffTop <= 20 && diffTop > 0);
}

function onDragStart(e: DragEvent) {
	$isDragging = true;
	draggedElement = e.currentTarget as HTMLElement;
}

function onDragEnd(e: DragEvent) {
	setTimeout(() => {
		stopDragOver();
		draggedElement = null;
		$isDragging = false;
	});
	const pos1 = getPosRecursive(e.target);
	if (pos1 == null) {
		return;
	}
	const el = document.elementFromPoint(e.clientX, e.clientY);
	const pos2 = getPosRecursive(el);
	if (pos2 == null) {
		return;
	}
	const state = getState(pos2);
	if (state.dragOverBottom) {
		moveToBottom(pos1, pos2);
	} else if (state.dragOverTop) {
		moveToTop(pos1, pos2);
	} else {
		swap(pos1, pos2);
	}
}
</script>

<div
	{...$$restProps}
	draggable="true"
	on:dragenter={onDragEnter}
	on:dragstart={onDragStart}
	on:dragend={onDragEnd}
	on:dragover={onDragOver}
	role="cell"
	tabindex={1}
>
	<slot />
</div>

<style>
div {
  position: relative;
}

div[data-drag-over]::after {
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  border: 5px solid var(--foreground);
  opacity: 0.25;
  content: "";
}

div[data-drag-over-bottom]::after {
  border-top: none;
  border-right: none;
  border-bottom: 5px solid var(--foreground);
  border-left: none;
}

div[data-drag-over-top]::after {
  border-top: 5px solid var(--foreground);
  border-right: none;
  border-bottom: none;
  border-left: none;
}
</style>
