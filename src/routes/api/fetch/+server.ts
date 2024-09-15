import { type Fetcher, fetchers } from "$lib/server/clickhouse/ops/_ops";
import { json } from "@sveltejs/kit";

const DEPLOYMENT_ID = crypto.randomUUID().toUpperCase();

export async function GET(request: Request) {
	const fetchers_ = Array.from(
		new Set(new URL(request.url).searchParams.keys()),
	);
	return json(
		Object.fromEntries(
			await Promise.all(
				fetchers_
					.filter((v): v is Fetcher => v in fetchers)
					.map((v) => fetchers[v]().then((v_) => [v, v_])),
			),
		),
		{ headers: { "x-deployment-id": DEPLOYMENT_ID } },
	);
}
