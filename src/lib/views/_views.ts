import type { SvelteComponent } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import type { Fetcher, FetcherResult } from "./_utils.ts";
import BotsByEngagement from "./BotsByEngagement.svelte";
import CountCallbackQueries from "./CountCallbackQueries.svelte";
import CountInlineFeedbacks from "./CountInlineFeedbacks.svelte";
import CountInlineQueries from "./CountInlineQueries.svelte";
import CountMessages from "./CountMessages.svelte";
import CountUpdates from "./CountUpdates.svelte";
import CountUsers from "./CountUsers.svelte";
import LanguagesByUsers from "./LanguagesByUsers.svelte";
import MostPopularBot from "./MostPopularBot.svelte";
import MostPopularChatType from "./MostPopularChatType.svelte";
import MostPopularLanguage from "./MostPopularLanguage.svelte";
import MostPopularMessageType from "./MostPopularMessageType.svelte";
import MostPopularUpdateType from "./MostPopularUpdateType.svelte";
import MostPopularUser from "./MostPopularUser.svelte";
import UpdatesLast from "./UpdatesLast.svelte";
import UpdatesLastCallbackQuery from "./UpdatesLastCallbackQuery.svelte";
import UpdatesLastInlineQuery from "./UpdatesLastInlineQuery.svelte";
import UpdatesLastUser from "./UpdatesLastUser.svelte";
import UsersByEngagement from "./UsersByEngagement.svelte";

interface View<T extends Fetcher = Fetcher> {
	fetcher: T;
	component: typeof SvelteComponent<
		{ data: FetcherResult<T> } & HTMLAttributes<HTMLDivElement>
	>;
}

const views: View[] = [
	{
		fetcher: "bots_by_engagement",
		component: BotsByEngagement,
	},
	{
		fetcher: "count_callback_queries",
		component: CountCallbackQueries,
	},
	{
		fetcher: "count_inline_feedbacks",
		component: CountInlineFeedbacks,
	},
	{
		fetcher: "count_inline_queries",
		component: CountInlineQueries,
	},
	{
		fetcher: "count_messages",
		component: CountMessages,
	},
	{
		fetcher: "count_updates",
		component: CountUpdates,
	},
	{
		fetcher: "count_users",
		component: CountUsers,
	},
	{
		fetcher: "languages_by_users",
		component: LanguagesByUsers,
	},
	{
		fetcher: "most_popular_bot",
		component: MostPopularBot,
	},
	{
		fetcher: "most_popular_chat_type",
		component: MostPopularChatType,
	},
	{
		fetcher: "most_popular_language",
		component: MostPopularLanguage,
	},
	{
		fetcher: "most_popular_message_type",
		component: MostPopularMessageType,
	},
	{
		fetcher: "most_popular_update_type",
		component: MostPopularUpdateType,
	},
	{
		fetcher: "most_popular_user",
		component: MostPopularUser,
	},
	{
		fetcher: "updates_last",
		component: UpdatesLast,
	},
	{
		fetcher: "updates_last_callback_query",
		component: UpdatesLastCallbackQuery,
	},
	{
		fetcher: "updates_last_inline_query",
		component: UpdatesLastInlineQuery,
	},
	{
		fetcher: "updates_last_user",
		component: UpdatesLastUser,
	},
	{
		fetcher: "users_by_engagement",
		component: UsersByEngagement,
	},
];

export default views;
