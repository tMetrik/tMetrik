import { MessageType } from "$lib/core/entry/message_type";
import { client } from "$lib/server/clickhouse/client";
import { defineFetcher } from "./_types";

const query = (view: string) => `
SELECT
  message_type,
  count(*) AS count
FROM ${view}
WHERE message_type IN (
  SELECT DISTINCT message_type
  FROM ${view}
  WHERE message_type != ${MessageType.Unsupported}
)
GROUP BY message_type
ORDER BY count DESC
LIMIT 1
`;

export default defineFetcher(async (view) => {
	const result = await client.query({ query: query(view) });
	const x = +(await result.json<{ message_type: string; count: string }>()).data[0]
		?.message_type || 0;
	return MessageType[x];
});
