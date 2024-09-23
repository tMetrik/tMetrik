import { client } from "$lib/server/clickhouse/client";
import { defineFetcher } from "./_types";

const query = (view: string, prefix: string) => `
${prefix}
SELECT COUNT(DISTINCT "from") AS count
FROM ${view}
`;

export default defineFetcher(async (view, prefix) => {
	const result = await client.query({ query: query(view, prefix) });
	return +(await result.json<{ count: string }>()).data[0]?.count;
});
