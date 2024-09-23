import { client } from "$lib/server/clickhouse/client";
import { defineFetcher } from "./_types";

const query = (view: string, prefix: string) => `
${prefix}
SELECT DISTINCT
    from_languagecode,
    count(timestamp) AS count
FROM ${view}
WHERE from_languagecode != ''
GROUP BY from_languagecode
ORDER BY count DESC
LIMIT 1
`;

export default defineFetcher(async (view, prefix) => {
	const result = await client.query({ query: query(view, prefix) });
	return (
		(await result.json<{ from_languagecode: string; count: string }>()).data[0]
			?.from_languagecode || "N/A"
	);
});
