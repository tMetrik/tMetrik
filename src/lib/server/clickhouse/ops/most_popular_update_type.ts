import { UpdateType } from "$lib/core/entry/update_type";
import { client } from "$lib/server/clickhouse/client";
import { defineFetcher } from "./_types";

const query = (view: string, prefix: string) => `
${prefix}
SELECT
  "type",
  count(*) AS count
FROM ${view}
WHERE "type" IN (
  SELECT DISTINCT "type"
  FROM ${view}
)
GROUP BY "type"
ORDER BY count DESC
LIMIT 1
`;

export default defineFetcher(async (view, prefix) => {
	const result = await client.query({ query: query(view, prefix) });
	const x = +(await result.json<{ type: string; count: string }>()).data[0]?.type || 0;
	return UpdateType[x];
});
