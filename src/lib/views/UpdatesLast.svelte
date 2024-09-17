<script lang="ts">
import Card from "$lib/components/Card.svelte";
import CardTitle from "$lib/components/CardTitle.svelte";
import CardValue from "$lib/components/CardValue.svelte";
import Muted from "$lib/components/Muted.svelte";
import type { ComponentProps } from "svelte";
import { format } from "timeago.js";
import type { FetcherResult } from "./_utils";

interface $$Props extends ComponentProps<Card> {
	data: FetcherResult<"updates_last">;
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
