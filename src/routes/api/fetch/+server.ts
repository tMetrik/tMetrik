import fetchers from "$lib/server/clickhouse/ops/_ops";
import { json } from "@sveltejs/kit";

const DEPLOYMENT_ID = crypto.randomUUID().toUpperCase();

export async function GET(request: Request) {
	let view = "updates_view";
	let prefix = "";

	const params = new URL(request.url).searchParams;
	const from = Math.floor(new Date(params.get("from") ?? "").getTime() / 1_000);
	const to = Math.floor(new Date(params.get("to") ?? "").getTime() / 1_000);
	if (from && to) {
		prefix = `WITH (SELECT * FROM ${view} WHERE timestamp >= ${from} AND timestamp <= ${to}) AS ${view}_`;
		view += "_";
	} else if (from) {
		prefix = `WITH (SELECT * FROM ${view} WHERE timestamp >= ${from}) AS ${view}_`;
		view += "_";
	} else if (to) {
		prefix = `WITH (SELECT * FROM ${view} WHERE timestamp <= ${to}) AS ${view}_`;
		view += "";
	}

	const fetchers_ = Array.from(new Set(params.keys()));
	return json(
		Object.fromEntries(
			await Promise.all(
				fetchers_
					.filter((v): v is keyof typeof fetchers => v in fetchers)
					.map(async (v) => fetchers[v](view, prefix).then((v_: unknown) => [v, v_])),
			),
		),
		{ headers: { "x-deployment-id": DEPLOYMENT_ID } },
	);
}
