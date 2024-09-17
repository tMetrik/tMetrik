<script lang="ts">
import Card from "$lib/components/Card.svelte";
import CardTitle from "$lib/components/CardTitle.svelte";
import CardValue from "$lib/components/CardValue.svelte";
import type { ComponentProps } from "svelte";
import type { FetcherResult } from "./_utils";
import { formatFrom } from "./_utils";

interface $$Props extends ComponentProps<Card> {
	data: FetcherResult<"most_popular_bot">;
}

export let data: $$Props["data"];

$: mostPopularBot = data;
</script>

<Card {...$$restProps}>
	<CardTitle>Most Popular Bot</CardTitle>
	<CardValue
		data-tooltip={JSON.stringify({ _: "userInfo", ...mostPopularBot, bot: true })}
	>
		{formatFrom(mostPopularBot)}
	</CardValue>
</Card>
