import { client } from "$lib/server/clickhouse/client";
import { sql } from "../sql";

const query = sql`
SELECT
  COUNT(timestamp) as count
FROM
  updates_view
`;

export async function countUpdates() {
	const result = await client.query({ query });
	return +(await result.json<{ count: string }>()).data[0]?.count;
}
