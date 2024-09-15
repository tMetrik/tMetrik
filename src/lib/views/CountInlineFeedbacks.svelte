<script lang="ts">
import Card from "$lib/components/Card.svelte";
import CardTitle from "$lib/components/CardTitle.svelte";
import CardValue from "$lib/components/CardValue.svelte";
import type { FetcherResult } from "$lib/server/clickhouse/ops/_ops";
import type { ComponentProps } from "svelte";
import { numberFormat } from "./_utils";

interface $$Props extends ComponentProps<Card> {
	data: FetcherResult<"countInlineFeedbacks">;
}

export let data: $$Props["data"];

$: count = data;
</script>

<Card {...$$restProps}>
	<CardTitle>All Inline Feedbacks</CardTitle>
	<CardValue>{numberFormat.format(count)}</CardValue>
</Card>
