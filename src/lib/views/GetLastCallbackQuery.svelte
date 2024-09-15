<script lang="ts">
import Card from "$lib/components/Card.svelte";
import CardTitle from "$lib/components/CardTitle.svelte";
import CardValue from "$lib/components/CardValue.svelte";
import Muted from "$lib/components/Muted.svelte";
import type { FetcherResult } from "$lib/server/clickhouse/ops/_ops";
import type { ComponentProps } from "svelte";

interface $$Props extends ComponentProps<Card> {
	data: FetcherResult<"getLastCallbackQuery">;
}

export let data: $$Props["data"];

$: lastCallbackQuery = data.trim();
</script>

<Card {...$$restProps}>
	<CardTitle>Last Callback Query</CardTitle>
	<CardValue>
		{#if lastCallbackQuery}
			{lastCallbackQuery}
		{:else}
			<Muted>N/A</Muted>
		{/if}
	</CardValue>
</Card>
