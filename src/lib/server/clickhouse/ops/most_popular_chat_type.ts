import { ChatType } from "$lib/core/entry/chat_type";
import { client } from "$lib/server/clickhouse/client";
import { defineFetcher } from "./_types";

const query = (view: string, prefix: string) => `
${prefix}
SELECT
  chat_type,
  count(*) AS count
FROM ${view}
WHERE chat_type IN (
  SELECT DISTINCT chat_type
  FROM ${view}
  WHERE chat_type != ${ChatType.Unknown}
)
GROUP BY chat_type
ORDER BY count DESC
LIMIT 1
`;

export default defineFetcher(async (view, prefix) => {
	const result = await client.query({ query: query(view, prefix) });
	const x = +(await result.json<{ chat_type: string; count: string }>()).data[0]
		?.chat_type || 0;
	return ChatType[x];
});
