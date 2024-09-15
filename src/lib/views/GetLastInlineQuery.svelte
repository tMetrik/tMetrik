<script lang="ts">
import Card from "$lib/components/Card.svelte";
import CardTitle from "$lib/components/CardTitle.svelte";
import CardValue from "$lib/components/CardValue.svelte";
import Muted from "$lib/components/Muted.svelte";
import type { FetcherResult } from "$lib/server/clickhouse/ops/_ops";
import type { ComponentProps } from "svelte";

interface $$Props extends ComponentProps<Card> {
	data: FetcherResult<"getLastInlineQuery">;
}

export let data: $$Props["data"];

$: lastInlineQuery = data.trim();
</script>

<Card {...$$restProps}>
	<CardTitle>Last Inline Query</CardTitle>
	<CardValue>
		{#if lastInlineQuery}
			{lastInlineQuery}
		{:else}
			<Muted>N/A</Muted>
		{/if}
	</CardValue>
</Card>
