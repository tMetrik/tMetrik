import { client } from "$lib/server/clickhouse/client";
import { defineFetcher } from "./_types";

const query = (view: string, prefix: string) => `
${prefix}
SELECT
  callbackquery_data
FROM ${view}
WHERE callbackquery_data != ''
ORDER BY timestamp DESC
LIMIT 1
`;

export default defineFetcher(async (view, prefix) => {
	const result = await client.query({ query: query(view, prefix) });
	return (
		(await result.json<{ callbackquery_data: string }>()).data[0]
			?.callbackquery_data ?? ""
	);
});
