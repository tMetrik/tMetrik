import { views } from "$lib/views";
import { writable } from "svelte/store";
import type { Config } from "./0_types";
import { reloadViewStates } from "./1_view_states";

export const config = writable<Config>([]);

export const DEFAULT_CONFIG: Config = [
	["getLastUpdate", "getLastUser", "getUsersByEngagement"],
	["getMostPopularUpdateType", "getMostPopularUser", "getLanguagesByUsers"],
	[
		"countUpdates",
		"countUsers",
		"getBotsByEngagement",
	],
	[
		"getMostPopularMessageType",
		"countMessages",
		"getLastInlineQuery",
	],
	[
		"getMostPopularChatType",
		"countCallbackQueries",
		"getLastCallbackQuery",
	],
	[
		"getMostPopularLanguage",
		"countInlineQueries",
	],
	[
		"getMostPopularBot",
		"countInlineFeedbacks",
	],
];

if (typeof document !== "undefined") {
	config.subscribe((config) => {
		if (!config.flat().length) return;
		const newSerialized = btoa(JSON.stringify(config));
		if (location.hash.slice(1) != newSerialized) {
			history.replaceState(undefined, "", `#${newSerialized}`);
		}
	});

	/// LOAD INITIAL CONFIG
	try {
		const config_: Config = JSON.parse(atob(location.hash.slice(1)));

		for (const item of config_.flat()) {
			if (typeof item !== "string" || !(item in views)) {
				throw new TypeError(`Invalid view: ${item}`);
			}
		}
		config.set(config_);
		reloadViewStates(config_);
	} catch {
		config.set(DEFAULT_CONFIG);
		reloadViewStates(DEFAULT_CONFIG);
	}
}