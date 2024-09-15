import { get, type Writable } from "svelte/store";
import type { Pos } from "./0_types";
import { viewStates } from "./1_view_states";
import { config } from "./2_config";

export function swap(pos1: Pos, pos2: Pos) {
	swapInner(config, pos1, pos2);
	swapInner(viewStates, pos1, pos2);
}
function swapInner(writable: Writable<unknown[][]>, pos1: Pos, pos2: Pos) {
	const writable_ = get(writable);
	const _1 = writable_[pos1.col]?.[pos1.row];
	const _2 = writable_[pos2.col]?.[pos2.row];
	if (!_1 || !_2) return;
	writable_[pos1.col][pos1.row] = _2;
	writable_[pos2.col][pos2.row] = _1;
	writable.set(writable_);
}

export function moveToBottom(pos1: Pos, pos2: Pos) {
	moveToBottomInner(config, pos1, pos2);
	moveToBottomInner(viewStates, pos1, pos2);
}
function moveToBottomInner(writable: Writable<unknown[][]>, pos1: Pos, pos2: Pos) {
	const writable_ = get(writable);
	const cell = writable_[pos1.col]?.[pos1.row];
	if (!cell) {
		return;
	}
	writable_[pos1.col].splice(pos1.row, 1);
	writable_[pos2.col].splice(pos2.row + 1, 0, cell);
	writable.set(writable_);
}

export function moveToTop(pos1: Pos, pos2: Pos) {
	moveToTopInner(config, pos1, pos2);
	moveToTopInner(viewStates, pos1, pos2);
}
function moveToTopInner(writable: Writable<unknown[][]>, pos1: Pos, pos2: Pos) {
	const writable_ = get(writable);
	const cell = writable_[pos1.col]?.[pos1.row];
	if (!cell) {
		return;
	}
	writable_[pos1.col].splice(pos1.row, 1);
	writable_[pos2.col].splice(pos2.row, 0, cell);
	writable.set(writable_);
}
