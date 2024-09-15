import { sql } from "../sql";
import { getUsers } from "./_utils";
import { constructUser, type User } from "./most_popular_user";

const query = sql`
SELECT
  "from",
  from_bot,
  from_username,
  from_firstname,
  from_lastname,
  from_languagecode,
  from_premium,
  from_type,
  from_title
FROM updates_view
ORDER BY timestamp DESC
LIMIT 1
`;

export async function getLastUser(): Promise<User> {
	return constructUser((await getUsers(query))[0]);
}
