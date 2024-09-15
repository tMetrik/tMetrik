import { UpdateType } from "$lib/core/entry/update_type";
import { client } from "$lib/server/clickhouse/client";
import { sql } from "../sql";
import { toPercentageString } from "./_utils";

const query = sql`
SELECT DISTINCT
  "type", count("type") AS count
FROM updates_view
WHERE type != ${UpdateType.Unknown}
  GROUP BY "type"
`;

export async function getChartDataUpdateTypes() {
	const result = await client.query({ query });
	const results = new Array<{ name: string; value: number }>();
	for (
		const item of (await result.json<{ type: string; count: string }>())
			.data
	) {
		results.push({
			name: UpdateType[
				item.type as keyof typeof UpdateType
			] as unknown as string,
			value: +item.count || 0,
		});
	}
	const sum = results.map((v) => v.value).reduce((a, b) => a + b, 0);
	for (const result of results) {
		result.name += ` (${toPercentageString(result.value / sum)})`;
	}
	return results;
}
