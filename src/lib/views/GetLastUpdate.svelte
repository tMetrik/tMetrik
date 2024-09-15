<script lang="ts">
import Card from "$lib/components/Card.svelte";
import CardTitle from "$lib/components/CardTitle.svelte";
import CardValue from "$lib/components/CardValue.svelte";
import Muted from "$lib/components/Muted.svelte";
import type { FetcherResult } from "$lib/server/clickhouse/ops/_ops";
import type { ComponentProps } from "svelte";
import { format } from "timeago.js";

interface $$Props extends ComponentProps<Card> {
	data: FetcherResult<"getLastUpdate">;
}

export let data: $$Props["data"];

$: lastUpdate = data;
</script>

<Card {...$$restProps}>
	<CardTitle>Last Update</CardTitle>
	<CardValue>
		{#if lastUpdate != null}
			{format(new Date(lastUpdate), "en_US")}
		{:else}
			<Muted>N/A</Muted>
		{/if}
	</CardValue>
</Card>
