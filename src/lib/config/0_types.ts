import type { Fetcher } from "$lib/server/clickhouse/ops/_ops";

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
