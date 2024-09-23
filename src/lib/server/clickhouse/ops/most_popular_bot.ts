import { client } from "$lib/server/clickhouse/client";
import { defineFetcher } from "./_types";

const query = (view: string, prefix: string) => `
${prefix}
SELECT
  "to",
  to_username,
  to_firstname,
  to_lastname,
  count(*) AS count
FROM ${view}
WHERE "to" IN (
  SELECT DISTINCT "to"
  FROM ${view}
)
GROUP BY
  "to",
  to_username,
  to_firstname,
  to_lastname
ORDER BY to_username DESC, count DESC
LIMIT 1
`;
export default defineFetcher(async (view, prefix) => {
	const result = await client.query({ query: query(view, prefix) });
	const entry = (
		await result.json<{
			to: string;
			to_username: string;
			to_firstname: string;
			to_lastname: string;
			count: string;
		}>()
	).data[0] ?? {};
	return {
		id: +entry.to,
		username: entry.to_username ?? "",
		firstName: entry.to_firstname ?? "",
		lastName: entry.to_lastname ?? "",
	};
});
