<script lang="ts">
import Card from "$lib/components/Card.svelte";
import MoveableViewWrapper from "$lib/components/MoveableViewWrapper.svelte";
import Title from "$lib/components/Title.svelte";
import type { FetcherResult } from "$lib/server/clickhouse/ops/_ops";
import type { ComponentProps } from "svelte";
import { numberFormat } from "./_utils";

interface $$Props extends ComponentProps<Card> {
	data: FetcherResult<"getLanguagesByUsers">;
}

export let data: $$Props["data"];

$: langs = data;
</script>

<MoveableViewWrapper {...$$restProps}>
	<Title>Top Languages</Title>
	{#each langs as lang, i (lang.code)}
		<Card flexibleHeight compact static>
			<div style="font-size: 16px">
				{(i + 1 + "").padStart(2, "0")}.{" "}
				<span
					data-tooltip={JSON.stringify({
						_: "text",
						text: `${numberFormat.format(lang.userCount)} user${
							lang.userCount == 1 ? "" : "s"
						}`,
					})}
				>
					{lang.code}
				</span>
			</div>
		</Card>
	{/each}
</MoveableViewWrapper>
