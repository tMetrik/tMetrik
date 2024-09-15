import { UpdateType } from "$lib/core/entry/update_type";
import { client } from "$lib/server/clickhouse/client";
import { sql } from "../sql";

const query = sql`
SELECT
  "type",
  count(*) AS count
FROM updates_view
WHERE "type" IN (
  SELECT DISTINCT "type"
  FROM updates_view
)
GROUP BY "type"
ORDER BY count DESC
LIMIT 1
`;
export async function getMostPopularUpdateType() {
	const result = await client.query({ query });
	const x = +(await result.json<{ type: string; count: string }>()).data[0]?.type || 0;
	return UpdateType[x];
}
