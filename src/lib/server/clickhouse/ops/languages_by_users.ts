import { client } from "$lib/server/clickhouse/client";
import { defineFetcher } from "./_types";

const query = (view: string, prefix: string) => `
${prefix}
SELECT DISTINCT
    from_languagecode,
    count(from) AS count
FROM
(
    SELECT DISTINCT
        from,
        from_languagecode
    FROM ${view}
    WHERE from_languagecode != ''
    GROUP BY
        from,
        from_languagecode
)
GROUP BY from_languagecode
ORDER BY count DESC
`;

interface Language {
	code: string;
	userCount: number;
}

export default defineFetcher<Language[]>(async (view, prefix) => {
	const entries = (
		await (
			await client.query({ query: query(view, prefix) })
		).json<{ from_languagecode: string; count: number }>()
	).data;
	const results = new Array<Language>();
	for (const entry of entries) {
		results.push({
			code: entry.from_languagecode,
			userCount: +entry.count || 0,
		});
	}
	return results;
});
