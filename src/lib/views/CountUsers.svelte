<script lang="ts">
import Card from "$lib/components/Card.svelte";
import CardTitle from "$lib/components/CardTitle.svelte";
import CardValue from "$lib/components/CardValue.svelte";
import type { ComponentProps } from "svelte";
import type { FetcherResult } from "./_utils";
import { numberFormat } from "./_utils";

interface $$Props extends ComponentProps<Card> {
	data: FetcherResult<"count_users">;
}

export let data: $$Props["data"];

$: count = data;
</script>

<Card {...$$restProps}>
	<CardTitle>All Users</CardTitle>
	<CardValue>{numberFormat.format(count)}</CardValue>
</Card>
