import { client } from "$lib/server/clickhouse/client";
import { defineFetcher } from "./_types";

const query = (view: string, prefix: string) => `
${prefix}
SELECT
  inlinequery_text
FROM ${view}
WHERE inlinequery_text != ''
ORDER BY timestamp DESC
LIMIT 1
`;

export default defineFetcher(async (view, prefix) => {
	const result = await client.query({ query: query(view, prefix) });
	return (
		(await result.json<{ inlinequery_text: string }>()).data[0]
			?.inlinequery_text ?? ""
	);
});
