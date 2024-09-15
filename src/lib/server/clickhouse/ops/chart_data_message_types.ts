import { MessageType } from "$lib/core/entry/message_type";
import { client } from "$lib/server/clickhouse/client";
import { sql } from "../sql";
import { toPercentageString } from "./_utils";

const query = sql`
SELECT DISTINCT
  "message_type", count("message_type") AS count
FROM updates_view
WHERE message_type != ${MessageType.Unsupported}
  GROUP BY "message_type"
`;

export async function getChartDataMessageTypes() {
	const result = await client.query({ query });
	const results = new Array<{ name: string; value: number }>();
	for (
		const item of (
			await result.json<{ message_type: string; count: string }>()
		).data
	) {
		results.push({
			name: MessageType[
				item.message_type as keyof typeof MessageType
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
