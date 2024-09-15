import { Z_Entry } from "$lib/core/entry.zod";
import { err, errStatus, ok200 } from "$lib/misc.server";
import { client } from "$lib/server/clickhouse/client";
import { keys } from "$lib/server/keys";
import { StatusCodes } from "http-status-codes";

export async function POST({ request }: { request: Request }) {
	const id = crypto.randomUUID().toUpperCase();
	const url = new URL(request.url);
	const key = url.searchParams.get("key")?.toLowerCase();
	if (!key || !keys.includes(key)) {
		return errStatus(StatusCodes.UNAUTHORIZED);
	}
	let values;
	try {
		values = await request.json();
		for (const value of values) {
			Z_Entry.parse(value);
		}
	} catch (err_) {
		console.error(id, err_);
		return err(id, { status: StatusCodes.BAD_REQUEST });
	}
	try {
		await client.insert({
			table: "updates",
			values,
			format: "JSONEachRow",
			clickhouse_settings: {
				date_time_input_format: "best_effort",
			},
		});
		return ok200();
	} catch (err_) {
		console.error(id, err_);
		return err(id, { status: StatusCodes.INTERNAL_SERVER_ERROR });
	}
}
