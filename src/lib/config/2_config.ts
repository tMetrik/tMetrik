import views from "$lib/views/_views";
import { writable } from "svelte/store";
import type { Config } from "./0_types";
import { reloadViewStates } from "./1_view_states";

export const config = writable<Config>([]);

export const DEFAULT_CONFIG: Config = [
	["updates_last", "updates_last_user", "users_by_engagement"],
	["most_popular_update_type", "most_popular_user", "languages_by_users"],
	[
		"count_updates",
		"count_users",
		"bots_by_engagement",
	],
	[
		"most_popular_message_type",
		"count_messages",
		"updates_last_inline_query",
	],
	[
		"most_popular_chat_type",
		"count_callback_queries",
		"updates_last_callback_query",
	],
	[
		"most_popular_language",
		"count_inline_queries",
	],
	[
		"most_popular_bot",
		"count_inline_feedbacks",
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
