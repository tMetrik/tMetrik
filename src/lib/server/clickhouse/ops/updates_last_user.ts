import { defineFetcher } from "./_types";
import { getUsers } from "./_utils";
import { constructUser } from "./most_popular_user";

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
  from_title
FROM ${view}
ORDER BY timestamp DESC
LIMIT 1
`;

export default defineFetcher(async (view) => {
	return constructUser((await getUsers(query(view)))[0]);
});
