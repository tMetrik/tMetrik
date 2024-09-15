import { sql } from "../sql";
import { getUsers } from "./_utils";
import { constructUser, type User } from "./most_popular_user";

const query = (limit: number) =>
	sql`
SELECT
  "from",
  from_bot,
  from_username,
  from_firstname,
  from_lastname,
  from_languagecode,
  from_premium,
  from_type,
  from_title,
  count(*) AS count
FROM
  updates_view
WHERE "from" IN (
  SELECT DISTINCT "from" FROM updates_view
)
GROUP BY
  "from",
  from_bot,
  from_username,
  from_firstname,
  from_lastname,
  from_languagecode,
  from_premium,
  from_type,
  from_title
ORDER BY count DESC
LIMIT ${limit}
`;

export type UserWithEngagementCount = User & { count: number };

export async function getUsersByEngagement(): Promise<UserWithEngagementCount[]> {
	const entries = await getUsers<{ count: number }>(query(50));
	const results = new Array<UserWithEngagementCount>();
	for (const entry of entries) {
		results.push({
			...constructUser(entry),
			count: +entry.count || 0,
		});
	}
	return results;
}
