import { client } from "$lib/server/clickhouse/client";
import { defineFetcher } from "./_types";

const query = (view: string) => `
SELECT DISTINCT
    from_languagecode,
    count(timestamp) AS count
FROM ${view}
WHERE from_languagecode != ''
GROUP BY from_languagecode
ORDER BY count DESC
LIMIT 1
`;

export default defineFetcher(async (view) => {
	const result = await client.query({ query: query(view) });
	return (
		(await result.json<{ from_languagecode: string; count: string }>()).data[0]
			?.from_languagecode || "N/A"
	);
});
