<script lang="ts">
import Card from "$lib/components/Card.svelte";
import CardTitle from "$lib/components/CardTitle.svelte";
import CardValue from "$lib/components/CardValue.svelte";
import type { FetcherResult } from "$lib/server/clickhouse/ops/_ops";
import type { ComponentProps } from "svelte";

interface $$Props extends ComponentProps<Card> {
	data: FetcherResult<"getMostPopularLanguage">;
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
