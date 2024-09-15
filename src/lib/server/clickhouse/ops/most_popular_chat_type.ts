import { ChatType } from "$lib/core/entry/chat_type";
import { client } from "$lib/server/clickhouse/client";
import { sql } from "../sql";

const query = sql`
SELECT
  chat_type,
  count(*) AS count
FROM updates_view
WHERE chat_type IN (
  SELECT DISTINCT chat_type
  FROM updates_view
  WHERE chat_type != ${ChatType.Unknown}
)
GROUP BY chat_type
ORDER BY count DESC
LIMIT 1
`;
export async function getMostPopularChatType() {
	const result = await client.query({ query });
	const x = +(await result.json<{ chat_type: string; count: string }>()).data[0]
		?.chat_type || 0;
	return ChatType[x];
}
