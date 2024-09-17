import fetchers from "$lib/server/clickhouse/ops/_ops";
import { json } from "@sveltejs/kit";

const DEPLOYMENT_ID = crypto.randomUUID().toUpperCase();

export async function GET(request: Request) {
	const fetchers_ = Array.from(
		new Set(new URL(request.url).searchParams.keys()),
	);
	const view = "updates_view";
	return json(
		Object.fromEntries(
			await Promise.all(
				fetchers_
					.filter((v): v is keyof typeof fetchers => v in fetchers)
					.map(async (v) => fetchers[v](view).then((v_: unknown) => [v, v_])),
			),
		),
		{ headers: { "x-deployment-id": DEPLOYMENT_ID } },
	);
}
