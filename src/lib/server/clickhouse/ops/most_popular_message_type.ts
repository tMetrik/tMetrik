import { MessageType } from "$lib/core/entry/message_type";
import { client } from "$lib/server/clickhouse/client";
import { sql } from "../sql";

const query = sql`
SELECT
  message_type,
  count(*) AS count
FROM updates_view
WHERE message_type IN (
  SELECT DISTINCT message_type
  FROM updates_view
  WHERE message_type != ${MessageType.Unsupported}
)
GROUP BY message_type
ORDER BY count DESC
LIMIT 1
`;
export async function getMostPopularMessageType() {
	const result = await client.query({ query });
	const x = +(await result.json<{ message_type: string; count: string }>()).data[0]
		?.message_type || 0;
	return MessageType[x];
}
