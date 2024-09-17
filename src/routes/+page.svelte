<script lang="ts">
import CardCol from "$lib/components/CardCol.svelte";
import Onboarding from "$lib/components/Onboarding.svelte";
import { viewStates } from "$lib/config/1_view_states";
import { config } from "$lib/config/2_config";
import type { Fetcher } from "$lib/views/_utils";
import views from "$lib/views/_views";
import { onMount } from "svelte";

let fetching = false;
$: fetchers = $config.flat();
let data: Record<Fetcher, any> | null = null;

onMount(() => {
	let lastDeploymentId = "";
	setInterval(async () => {
		if (fetching) {
			return;
		}
		fetching = true;
		try {
			const search = new URLSearchParams(location.search);
			for (const fetcher of fetchers) {
				search.set(fetcher, "");
			}
			// return;
			const response = await fetch("/api/fetch?" + search);
			const deploymentId = response.headers.get("x-deployment-id");
			if (
				deploymentId
				&& lastDeploymentId
				&& lastDeploymentId != deploymentId
			) {
				location.reload();
				return;
			}
			if (deploymentId) {
				lastDeploymentId = deploymentId;
			}
			if (response.ok) {
				data = await response.json();
			} else if (response.status == 401) {
				location.replace("https://youtu.be/dQw4w9WgXcQ");
			}
		} finally {
			fetching = false;
		}
	}, 1_000);
});
</script>

{#if data}
	<div class="cards-container">
		{#each $config as rows, c}
			<CardCol>
				{#each rows as row, r (`${c}_${r}-${row}`)}
					{@const Component = views.find(v => v.fetcher == row)?.component}
					{@const state = $viewStates[c][r]}
					{#if state}
						<Component
							data={data[row]}
							data-view-pos={`${c}_${r}`}
							data-drag-over={state.dragOver ? 1 : undefined}
							data-drag-over-bottom={state.dragOverBottom ? 1 : undefined}
							data-drag-over-top={state.dragOverTop ? 1 : undefined}
						/>
					{/if}
				{/each}
			</CardCol>
		{/each}
	</div>
{/if}

<Onboarding />

<style>
.cards-container {
  display: flex;
  overflow-x: auto;
  gap: 1px;
  height: 100vh;

  &::before {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: var(--background);
    content: "";
    z-index: -1;
  }
}

:global([data-tooltip]) {
  cursor: crosshair;
}

:global([data-tooltip], .link) {
  text-decoration: underline;
  text-decoration-style: dotted;
  text-decoration-thickness: 3px;
  text-decoration-color: var(--tertiary);

  &:hover {
    text-decoration-color: var(--primary);
  }
}

.delete-area {
  position: fixed;
  bottom: 16;
  left: 50%;
  transform: translateX(-50%);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 64px;
  border: 1px solid #eb4034;
  color: #eb4034;
  user-select: none;
  z-index: 9999;
}

.delete-area_drag-over {
  background-color: #eb4034;
  color: white;
}
</style>
