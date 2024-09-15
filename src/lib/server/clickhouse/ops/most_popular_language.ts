import { client } from "$lib/server/clickhouse/client";
import { sql } from "../sql";

const query = sql`
SELECT DISTINCT
    from_languagecode,
    count(timestamp) AS count
FROM updates_view
WHERE from_languagecode != ''
GROUP BY from_languagecode
ORDER BY count DESC
LIMIT 1
`;
export async function getMostPopularLanguage() {
	const result = await client.query({ query });
	return (
		(await result.json<{ from_languagecode: string; count: string }>()).data[0]
			?.from_languagecode || "N/A"
	);
}
