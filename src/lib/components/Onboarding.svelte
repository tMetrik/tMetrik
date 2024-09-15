<script>
import { onMount } from "svelte";

const LS_KEY = "onboardingShown";
let show = false;

onMount(() => {
	show = !localStorage.getItem(LS_KEY);
});
</script>

{#if show}
	<div class="container">
		<div class="content">
			👋 Welcome
			<br />
			<br />
			🔴 The statistics are updated live
			<br />
			⬛️ The dashboard is divided into independent vertical blocks
			<br />
			🖱 Scroll both vertically and horizonally to move around
			<br />
			🔁 Drag views to reposition them
			<br />
			📝 Revisit the same URL to persist the positions of the views
			<br />
			🚧 <a
				href="tg://resolve?domain=tMetrik"
				class="link"
				rel="noopener noreferrer"
				target="blank"
			>Ping us</a> if you discover any bugs
			<button on:click={() => [localStorage.setItem(LS_KEY, "1"), show = false]}
			>Dismiss</button>
		</div>
	</div>
{/if}

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  z-index: 9999;
  position: fixed;
  width: 100%;
  height: 100vh;
  padding: 16px;
}

.container::before {
  pointer-events: none;
  content: "";
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  position: absolute;
  background-color: var(--foreground);
  z-index: -1;
  opacity: 0.25;
}

.content {
  background-color: var(--background);
  padding: 2rem;
  width: 100%;
  z-index: 5;
  max-width: 670px;
  line-height: 2;
}

button {
  width: 100%;
  border: 1px solid var(--foreground);
  margin-top: 38px;
  text-align: center;
  padding: 12px;
  line-height: 1 !important;
}

button:hover {
  background-color: var(--foreground);
  color: var(--background);
}
</style>
