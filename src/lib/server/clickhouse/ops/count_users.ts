import { client } from "$lib/server/clickhouse/client";
import { defineFetcher } from "./_types";

const query = (view: string) => `
SELECT COUNT(DISTINCT "from") AS count
FROM ${view}
`;

export default defineFetcher(async (view) => {
	const result = await client.query({ query: query(view) });
	return +(await result.json<{ count: string }>()).data[0]?.count;
});
