import { client } from "$lib/server/clickhouse/client";
import { sql } from "../sql";

const query = sql`
SELECT
  callbackquery_data
FROM updates_view
WHERE callbackquery_data != ''
ORDER BY timestamp DESC
LIMIT 1
`;

export async function getLastCallbackQuery() {
	const result = await client.query({ query });
	return (
		(await result.json<{ callbackquery_data: string }>()).data[0]
			?.callbackquery_data ?? ""
	);
}
