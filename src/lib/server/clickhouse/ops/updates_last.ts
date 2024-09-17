import { client } from "$lib/server/clickhouse/client";
import { defineFetcher } from "./_types";

const query = (view: string) => `
SELECT
  timestamp
FROM
  ${view}
ORDER BY timestamp DESC
LIMIT 1
`;

export default defineFetcher(async (view) => {
	const result = await client.query({ query: query(view) });
	const data = (await result.json<{ timestamp: string }>()).data;
	if (!data.length) {
		return null;
	}
	return data[0].timestamp;
});
