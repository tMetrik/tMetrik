import { UpdateType } from "$lib/core/entry/update_type";
import { client } from "$lib/server/clickhouse/client";
import { defineFetcher } from "./_types";

const query = (view: string) => `
SELECT
  COUNT(timestamp) as count
FROM
  ${view}
WHERE
  callbackquery_id != ''
AND
  "type" = ${UpdateType.CallbackQuery}
`;

export default defineFetcher(async (view) => {
	const result = await client.query({ query: query(view) });
	return +(await result.json<{ count: string }>()).data[0]?.count;
});
