import { ChatType } from "$lib/core/entry/chat_type";
import { client } from "$lib/server/clickhouse/client";
import { sql } from "../sql";
import { toPercentageString } from "./_utils";

const query = sql`
SELECT DISTINCT
  chat_type, count(chat_type) AS count
FROM updates_view
WHERE chat_type != ${ChatType.Unknown}
  GROUP BY chat_type
`;

export async function getChartDataChatTypes() {
	const result = await client.query({ query });
	const results = new Array<{ name: string; value: number }>();
	for (
		const item of (await result.json<{ chat_type: string; count: string }>())
			.data
	) {
		results.push({
			name: ChatType[
				item.chat_type as keyof typeof ChatType
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
