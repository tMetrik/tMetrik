<script lang="ts">
export let name: string;
export let hideIf: boolean = false;
export let value: string;

$: canAppear = typeof value === "string" ? !!value.trim() : !!value;
</script>

{#if canAppear && !hideIf}
	<div>
		{name}: {value}
	</div>
{/if}
