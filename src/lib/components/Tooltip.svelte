<script lang="ts">
import { ChatType } from "$lib/core/entry/chat_type";
import { idFormat, numberFormat } from "$lib/views/_utils";
import { onMount } from "svelte";
import type { TooltipData } from "./tooltip";
import ConditionalField from "./Tooltip/ConditionalField.svelte";

let data: TooltipData | null = null;
let top = "-9999px";
let left = "-9999px";
let visible: [boolean, Node | null] = [false, null];
let container: HTMLDivElement | undefined;

$: if (!visible[0]) {
	top = "-9999px";
	left = "-9999px";
}

onMount(() => {
	const hoverHover = matchMedia("(hover: hover)");
	let isDesktop = hoverHover.matches;
	hoverHover.addEventListener("change", () => {
		isDesktop = hoverHover.matches;
	});
	for (const event of ["click", "mouseover", "mouseenter"]) {
		addEventListener(
			event,
			(e) => {
				const el = e.target as HTMLElement | SVGElement;
				let tooltipData;
				if (el instanceof SVGPathElement) {
					const name = el.getAttribute("name")?.replaceAll("\"", "\\\"");
					if (name) {
						tooltipData = `{"type":"text","text":"${name}"}`;
					}
				} else {
					tooltipData = el?.dataset?.tooltip as unknown as TooltipData;
				}
				if (!tooltipData) {
					if (event == "click") {
						visible = [false, null];
					}
					return;
				}
				try {
					tooltipData = JSON.parse(tooltipData as unknown as string);
				} catch {
					return;
				}
				data = tooltipData;
				if (tooltipData) {
					visible = [true, el];
					if (isDesktop) {
						if (e instanceof MouseEvent) {
							top = getTop(e);
							left = getLeft(e);
						}
					} else {
						if (el instanceof HTMLElement) {
							top = `${el.offsetTop + el.clientHeight}px`;
							left = `${el.offsetLeft}px`;
						} else {
							if (e instanceof MouseEvent) {
								top = getTop(e);
								left = getLeft(e);
							}
						}
					}
				}
			},
			true,
		);
	}

	addEventListener("mousemove", (e) => {
		if (isDesktop && visible[0]) {
			top = getTop(e);
			left = getLeft(e);
		}
	});

	for (const event of ["mouseleave", "mouseout"]) {
		addEventListener(
			event,
			(e) => {
				const el = e.target as HTMLElement | SVGSVGElement;
				const tooltipData = el?.dataset?.tooltip;
				const [visible_, node] = visible;
				if (tooltipData) {
					if (visible_ && node == el) {
						visible = [false, null];
					}
				} else if (el instanceof SVGPathElement && el.getAttribute("name")) {
					if (visible_ && node == el) {
						visible = [false, null];
					}
				}
			},
			true,
		);
	}
	addEventListener(
		"scroll",
		() => {
			if (visible[0]) {
				visible = [false, null];
			}
		},
		true,
	);
});

// UTILS
function getTop(e: MouseEvent) {
	const height = container?.clientHeight ?? 0;
	if (e.clientY + height > document.documentElement.clientHeight) {
		return `${e.clientY - height}px`;
	} else {
		return `${e.clientY}px`;
	}
}
function getLeft(e: MouseEvent) {
	const width = container?.clientWidth ?? 0;
	if (e.clientX + width > document.documentElement.clientWidth) {
		return `${e.clientX - width}px`;
	} else {
		return `${e.clientX}px`;
	}
}
const languageCodeFormat = new Intl.DisplayNames([], { type: "language" });
function maybeFormattedLanguageCode(languageCode: string) {
	if (!languageCode) {
		return "";
	}
	try {
		const r = languageCodeFormat.of(languageCode);
		if (r != languageCode) {
			return ` (${r})`;
		}
		return "";
	} catch {
		return "";
	}
}
</script>

<div
	bind:this={container}
	class="container"
	style="--top: {top}; --left: {left}"
>
	{#if data && data._ == "userInfo"}
		<ConditionalField
			name="Type"
			value={data.bot
			? "Bot"
			: ((!isNaN(Number(data.type))
						? ChatType[data.type]
						: data.type) || "") + "" || "N/A"}
		/>
		<ConditionalField name="ID" value={idFormat.format(data.id)} />
		<ConditionalField
			name="Username"
			value={data.username ? "@" + data.username : ""}
		/>
		<ConditionalField name="Title" value={data.title} />
		<ConditionalField name="First Name" value={data.firstName} />
		<ConditionalField name="Last Name" value={data.lastName} />
		<ConditionalField
			name="Premium"
			value={data.premium ? "Yes" : "No"}
			hideIf={data.type != ChatType.User}
		/>
		<ConditionalField
			name="Language Code"
			value={data.languageCode
			? data.languageCode
				+ maybeFormattedLanguageCode(data.languageCode)
			: ""}
			hideIf={data.type != ChatType.User}
		/>
		<ConditionalField
			name="Engagements"
			value={"count" in data ? numberFormat.format(data.count) : "N/A"}
			hideIf={!("count" in data)}
		/>
	{/if}
	{#if data && data._ == "text"}
		{data.text}
	{/if}
</div>

<style>
.container {
  position: absolute;
  top: var(--top, -9999px) !important;
  left: var(--left, -9999px) !important;
  z-index: 9999;
  background-color: var(--background);
  padding: 5px 10px;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  pointer-events: none;
  overflow: hidden;
}
</style>
