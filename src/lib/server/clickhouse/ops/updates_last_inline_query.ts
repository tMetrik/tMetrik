import { client } from "$lib/server/clickhouse/client";
import { defineFetcher } from "./_types";

const query = (view: string) => `
SELECT
  inlinequery_text
FROM ${view}
WHERE inlinequery_text != ''
ORDER BY timestamp DESC
LIMIT 1
`;

export default defineFetcher(async (view) => {
	const result = await client.query({ query: query(view) });
	return (
		(await result.json<{ inlinequery_text: string }>()).data[0]
			?.inlinequery_text ?? ""
	);
});
