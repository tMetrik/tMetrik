<script lang="ts">
import Card from "$lib/components/Card.svelte";
import CardTitle from "$lib/components/CardTitle.svelte";
import CardValue from "$lib/components/CardValue.svelte";
import type { FetcherResult } from "$lib/server/clickhouse/ops/_ops";
import type { ComponentProps } from "svelte";

interface $$Props extends ComponentProps<Card> {
	data: FetcherResult<"getMostPopularChatType">;
}

export let data: $$Props["data"];

$: type = data;
</script>

<Card {...$$restProps}>
	<CardTitle>Most Popular Chat Type</CardTitle>
	<CardValue>
		{type}
	</CardValue>
</Card>
