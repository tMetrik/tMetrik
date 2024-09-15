import { sql } from "../sql";
import { getUsers } from "./_utils";
import type { User } from "./most_popular_user";

const query = (limit: number) =>
	sql`
SELECT
  "to",
  to_firstname,
  to_lastname,
  to_username,
  count(*) AS count
FROM
  updates_view
WHERE "to" IN (
  SELECT DISTINCT "to" FROM updates_view
)
GROUP BY
  "to",
  to_firstname,
  to_lastname,
  to_username
ORDER BY count DESC
LIMIT ${limit}
`;

export type UserWithEngagementCount = User & { count: number };

export async function getBotsByEngagement() {
	const entries = await getUsers<{
		to: string;
		to_username: string;
		to_firstname: string;
		to_lastname: string;
		count: string;
	}>(query(50));
	const results = new Array<{ id: number; username: string; firstName: string; lastName: string; count: number }>();
	for (const entry of entries) {
		results.push({
			id: +entry.to,
			username: entry.to_username ?? "",
			firstName: entry.to_firstname ?? "",
			lastName: entry.to_lastname ?? "",
			count: +entry.count,
		});
	}
	return results;
}
