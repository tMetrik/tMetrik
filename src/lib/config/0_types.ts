import type { Fetcher } from "$lib/views/_utils";

export type Config = Fetcher[][];

export interface ViewState {
	dragOver: boolean;
	dragOverBottom: boolean;
	dragOverTop: boolean;
}

export interface Pos {
	col: number;
	row: number;
}
