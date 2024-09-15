import { UpdateType } from "$lib/core/entry/update_type";
import { client } from "$lib/server/clickhouse/client";
import { sql } from "../sql";

const query = sql`
SELECT
  COUNT(timestamp) as count
FROM
  updates_view
WHERE
  message_id != 0
AND
  "type" = ${UpdateType.Message}
`;

export async function countMessages() {
	const result = await client.query({ query });
	return +(await result.json<{ count: string }>()).data[0]?.count;
}
