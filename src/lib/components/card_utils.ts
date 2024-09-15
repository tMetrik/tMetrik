import type { Pos } from "$lib/config/0_types";

export function getPosRecursive(el: unknown): Pos | null {
	if (!(el instanceof HTMLElement)) return null;
	let el_: HTMLElement | null = el;
	while (el_ != null) {
		const pos = getPos(el_);
		if (pos != null) {
			return pos;
		}
		el_ = el_.parentElement;
	}
	return null;
}
function getPos(el: unknown): Pos | null {
	if (!(el instanceof HTMLDivElement)) return null;
	const pos = el.dataset.viewPos;
	if (!pos) return null;
	const parts = pos.split("_");
	if (parts.length != 2) return null;
	const [col, row] = parts.map(Number);
	if (isNaN(col) || isNaN(row)) return null;
	return { col, row };
}
