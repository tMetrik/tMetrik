<script lang="ts">
import Card from "$lib/components/Card.svelte";
import CardTitle from "$lib/components/CardTitle.svelte";
import CardValue from "$lib/components/CardValue.svelte";
import type { ComponentProps } from "svelte";
import type { FetcherResult } from "./_utils";

interface $$Props extends ComponentProps<Card> {
	data: FetcherResult<"most_popular_language">;
}

export let data: $$Props["data"];

$: lang = data;
</script>

<Card {...$$restProps}>
	<CardTitle>Most Popular Language</CardTitle>
	<CardValue>
		{lang}
	</CardValue>
</Card>
