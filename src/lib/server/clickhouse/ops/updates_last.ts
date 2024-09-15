import { client } from "$lib/server/clickhouse/client";
import { sql } from "../sql";

const query = sql`
SELECT
  timestamp
FROM
  updates_view
ORDER BY timestamp DESC
LIMIT 1
`;

export async function getLastUpdate() {
	const result = await client.query({ query });
	const data = (await result.json<{ timestamp: string }>()).data;
	if (!data.length) {
		return null;
	}
	return data[0].timestamp;
}
