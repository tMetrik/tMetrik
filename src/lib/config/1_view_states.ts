import { get, writable } from "svelte/store";
import type { Config, Pos, ViewState } from "./0_types";

// VIEW STATE
export const viewStates = writable<ViewState[][]>([]);
export function reloadViewStates(config: Config) {
	viewStates.set(
		config.map((v) =>
			v.map(() => ({
				dragOver: false,
				dragOverBottom: false,
				dragOverTop: false,
			}))
		),
	);
}
export function getState(pos: Pos) {
	return (
		get(viewStates)[pos.col]?.[pos.row] || {
			dragOver: false,
			dragOverBottom: false,
			dragOverTop: false,
		}
	);
}
export function startDragOver(pos: Pos, bottom: boolean, top: boolean) {
	const viewStates_ = get(viewStates);
	for (const [col, _] of viewStates_.entries()) {
		for (const row of _.keys()) {
			viewStates_[col][row].dragOver = pos.col == col && pos.row == row;
			const dragOverBottom = pos.col == col && pos.row == row ? bottom : false;
			if (dragOverBottom && viewStates_[col][row + 1] == undefined) {
				viewStates_[col][row].dragOverBottom = dragOverBottom;
			}
			viewStates_[col][row].dragOverTop = pos.col == col && pos.row == row ? top : false;
		}
	}
	viewStates.set(viewStates_);
}
export function stopDragOver() {
	const viewStates_ = get(viewStates);
	for (const [col, _] of viewStates_.entries()) {
		for (const row of _.keys()) {
			viewStates_[col][row].dragOver = false;
			viewStates_[col][row].dragOverBottom = false;
			viewStates_[col][row].dragOverTop = false;
		}
	}
	viewStates.set(viewStates_);
}

export function stopDragOverPos(pos: Pos) {
	const viewStates_ = get(viewStates);
	for (const [col, _] of viewStates_.entries()) {
		for (const row of _.keys()) {
			if (col == pos.col && row == pos.row) {
				viewStates_[col][row].dragOver = false;
				viewStates_[col][row].dragOverBottom = false;
				viewStates_[col][row].dragOverTop = false;
			}
		}
	}
	viewStates.set(viewStates_);
}
