import { ChatType } from "$lib/core/entry/chat_type";
import { defineFetcher } from "./_types";
import { getUsers, type UserRaw } from "./_utils";

const query = (view: string) => `
SELECT
  from,
  from_bot,
  from_username,
  from_firstname,
  from_lastname,
  from_languagecode,
  from_premium,
  from_type,
  from_title,
  count(*) AS count
FROM ${view}
GROUP BY
    from,
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

export default defineFetcher(async (view) => {
	return constructUser((await getUsers(query(view)))[0]);
});
