import type { Fetcher, FetcherResult } from "$lib/server/clickhouse/ops/_ops";
import type { SvelteComponent } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import CountCallbackQueries from "./CountCallbackQueries.svelte";
import CountInlineFeedbacks from "./CountInlineFeedbacks.svelte";
import CountInlineQueries from "./CountInlineQueries.svelte";
import CountMessages from "./CountMessages.svelte";
import CountUpdates from "./CountUpdates.svelte";
import CountUsers from "./CountUsers.svelte";
import GetBotsByEngagement from "./GetBotsByEngagement.svelte";
import GetLanguagesByUsers from "./GetLanguagesByUsers.svelte";
import GetLastCallbackQuery from "./GetLastCallbackQuery.svelte";
import GetLastInlineQuery from "./GetLastInlineQuery.svelte";
import GetLastUpdate from "./GetLastUpdate.svelte";
import GetLastUser from "./GetLastUser.svelte";
import GetMostPopularBot from "./GetMostPopularBot.svelte";
import GetMostPopularChatType from "./GetMostPopularChatType.svelte";
import GetMostPopularLanguage from "./GetMostPopularLanguage.svelte";
import GetMostPopularMessageType from "./GetMostPopularMessageType.svelte";
import GetMostPopularUpdateType from "./GetMostPopularUpdateType.svelte";
import GetMostPopularUser from "./GetMostPopularUser.svelte";
import GetUsersByEngagement from "./GetUsersByEngagement.svelte";

interface View<T extends Fetcher = Fetcher> {
	fetcher: T;
	component: typeof SvelteComponent<
		{ data: FetcherResult<T> } & HTMLAttributes<HTMLDivElement>
	>;
}

export const views: View[] = [
	{
		fetcher: "countCallbackQueries",
		component: CountCallbackQueries,
	},
	{
		fetcher: "countInlineFeedbacks",
		component: CountInlineFeedbacks,
	},
	{
		fetcher: "countInlineQueries",
		component: CountInlineQueries,
	},
	{
		fetcher: "countMessages",
		component: CountMessages,
	},
	{
		fetcher: "countUpdates",
		component: CountUpdates,
	},
	{
		fetcher: "countUsers",
		component: CountUsers,
	},
	{
		fetcher: "getLastUpdate",
		component: GetLastUpdate,
	},
	{
		fetcher: "getLastUser",
		component: GetLastUser,
	},
	{
		fetcher: "getLastCallbackQuery",
		component: GetLastCallbackQuery,
	},
	{
		fetcher: "getLastInlineQuery",
		component: GetLastInlineQuery,
	},
	{
		"fetcher": "getMostPopularBot",
		component: GetMostPopularBot,
	},
	{
		fetcher: "getMostPopularChatType",
		component: GetMostPopularChatType,
	},
	{
		fetcher: "getMostPopularMessageType",
		component: GetMostPopularMessageType,
	},
	{
		fetcher: "getMostPopularUpdateType",
		component: GetMostPopularUpdateType,
	},
	{
		fetcher: "getMostPopularUser",
		component: GetMostPopularUser,
	},
	{
		fetcher: "getBotsByEngagement",
		component: GetBotsByEngagement,
	},
	{
		fetcher: "getMostPopularLanguage",
		component: GetMostPopularLanguage,
	},
	{
		fetcher: "getLanguagesByUsers",
		component: GetLanguagesByUsers,
	},
	{
		fetcher: "getUsersByEngagement",
		component: GetUsersByEngagement,
	},
];
