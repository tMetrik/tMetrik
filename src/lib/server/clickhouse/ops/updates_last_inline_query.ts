import { client } from "$lib/server/clickhouse/client";
import { sql } from "../sql";

const query = sql`
SELECT
  inlinequery_text
FROM updates_view
WHERE inlinequery_text != ''
ORDER BY timestamp DESC
LIMIT 1
`;

export async function getLastInlineQuery() {
	const result = await client.query({ query });
	return (
		(await result.json<{ inlinequery_text: string }>()).data[0]
			?.inlinequery_text ?? ""
	);
}
