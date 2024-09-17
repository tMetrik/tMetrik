import { defineFetcher } from "./_types";
import { getUsers } from "./_utils";
import { constructUser, type User } from "./most_popular_user";

const query = (limit: number) => `
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
  ${view}
WHERE "from" IN (
  SELECT DISTINCT "from" FROM ${view}
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

export default defineFetcher<UserWithEngagementCount[]>(async (view) => {
	const entries = await getUsers<{ count: number }>(query(50));
	const results = new Array<UserWithEngagementCount>();
	for (const entry of entries) {
		results.push({
			...constructUser(entry),
			count: +entry.count || 0,
		});
	}
	return results;
});
