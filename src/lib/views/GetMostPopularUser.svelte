<script lang="ts">
import Card from "$lib/components/Card.svelte";
import CardTitle from "$lib/components/CardTitle.svelte";
import CardValue from "$lib/components/CardValue.svelte";
import type { FetcherResult } from "$lib/server/clickhouse/ops/_ops";
import type { ComponentProps } from "svelte";
import { formatFrom } from "./_utils";

interface $$Props extends ComponentProps<Card> {
	data: FetcherResult<"getMostPopularUser">;
}

export let data: $$Props["data"];

$: mostPopularUser = data;
</script>

<Card {...$$restProps}>
	<CardTitle>Most Popular User</CardTitle>
	<CardValue
		data-tooltip={JSON.stringify({ _: "userInfo", ...mostPopularUser })}
	>
		{formatFrom(mostPopularUser)}
	</CardValue>
</Card>
