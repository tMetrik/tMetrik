<script lang="ts">
import Card from "$lib/components/Card.svelte";
import MoveableViewWrapper from "$lib/components/MoveableViewWrapper.svelte";
import Title from "$lib/components/Title.svelte";
import type { FetcherResult } from "$lib/server/clickhouse/ops/_ops";
import type { ComponentProps } from "svelte";
import { formatFrom } from "./_utils";

interface $$Props extends ComponentProps<Card> {
	data: FetcherResult<"getBotsByEngagement">;
}

export let data: $$Props["data"];

$: bots = data;
</script>

<MoveableViewWrapper {...$$restProps}>
	<Title>Top Bots</Title>
	{#each bots as bot, i (bot.id)}
		<Card flexibleHeight compact static>
			<div style="font-size: 16px">
				{(i + 1 + "").padStart(2, "0")}.{" "}
				<span
					data-tooltip={JSON.stringify({
						_: "userInfo",
						...bot,
						bot: true,
					})}
				>
					{formatFrom(bot)}
				</span>
			</div>
		</Card>
	{/each}
</MoveableViewWrapper>
