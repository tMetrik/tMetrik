<script lang="ts">
import Card from "$lib/components/Card.svelte";
import MoveableViewWrapper from "$lib/components/MoveableViewWrapper.svelte";
import Title from "$lib/components/Title.svelte";
import type { ComponentProps } from "svelte";
import type { FetcherResult } from "./_utils";
import { formatFrom, numberFormat } from "./_utils";

interface $$Props extends ComponentProps<Card> {
	data: FetcherResult<"users_by_engagement">;
}

export let data: $$Props["data"];

$: users = data;
</script>

<MoveableViewWrapper {...$$restProps}>
	<Title>Top 50 Users</Title>
	{#each users as user, i (user.id)}
		<Card flexibleHeight compact static>
			<div style="font-size: 16px">
				{(i + 1 + "").padStart(2, "0")}.{" "}
				<span
					data-tooltip={JSON.stringify({
						_: "userInfo",
						...user,
					})}
				>
					{formatFrom(user)}
				</span>
			</div>
		</Card>
	{/each}
</MoveableViewWrapper>
