import { client } from "$lib/server/clickhouse/client";

const query = `
SELECT DISTINCT
    from_languagecode,
    count(from) AS count
FROM
(
    SELECT DISTINCT
        from,
        from_languagecode
    FROM updates_view
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

export async function getLanguagesByUsers(): Promise<Language[]> {
	const entries = (
		await (
			await client.query({ query })
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
}
