<script lang="ts">
import Card from "$lib/components/Card.svelte";
import CardTitle from "$lib/components/CardTitle.svelte";
import CardValue from "$lib/components/CardValue.svelte";
import Muted from "$lib/components/Muted.svelte";
import type { ComponentProps } from "svelte";
import type { FetcherResult } from "./_utils";

interface $$Props extends ComponentProps<Card> {
	data: FetcherResult<"updates_last_callback_query">;
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
