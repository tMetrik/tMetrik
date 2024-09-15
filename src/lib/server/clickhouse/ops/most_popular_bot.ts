import { client } from "$lib/server/clickhouse/client";
import { sql } from "../sql";

const query = sql`
SELECT
  "to",
  to_username,
  to_firstname,
  to_lastname,
  count(*) AS count
FROM updates_view
WHERE "to" IN (
  SELECT DISTINCT "to"
  FROM updates_view
)
GROUP BY
  "to",
  to_username,
  to_firstname,
  to_lastname
ORDER BY to_username DESC, count DESC
LIMIT 1
`;
export async function getMostPopularBot() {
	const result = await client.query({ query });
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
}
