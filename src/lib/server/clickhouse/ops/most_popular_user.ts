import { ChatType } from "$lib/core/entry/chat_type";
import { sql } from "../sql";
import { getUsers, type UserRaw } from "./_utils";

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
  from_title,
  count(*) AS count
FROM updates_view
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
LIMIT 1
`;

export interface User {
	id: number;
	bot: boolean;
	username: string;
	firstName: string;
	lastName: string;
	languageCode: string;
	premium: boolean;
	type: ChatType;
	title: string;
}

export function constructUser(entry: UserRaw): User {
	return {
		id: +entry?.from,
		bot: entry?.from_bot ?? false,
		username: entry?.from_username ?? "",
		firstName: entry?.from_firstname ?? "",
		lastName: entry?.from_lastname ?? "",
		languageCode: entry?.from_languagecode ?? "",
		premium: entry?.from_premium ?? false,
		type: entry?.from_type ?? ChatType.Unknown,
		title: entry?.from_title ?? "",
	};
}
export async function getMostPopularUser(): Promise<User> {
	return constructUser((await getUsers(query))[0]);
}
