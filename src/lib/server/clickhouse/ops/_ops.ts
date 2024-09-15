import { getBotsByEngagement } from "./bots_by_engagement";
import { getChartDataChatTypes } from "./chart_data_chat_types";
import { getChartDataMessageTypes } from "./chart_data_message_types";
import { getChartDataUpdateTypes } from "./chart_data_update_types";
import { countCallbackQueries } from "./count_callback_queries";
import { countInlineFeedbacks } from "./count_inline_feedbacks";
import { countInlineQueries } from "./count_inline_queries";
import { countMessages } from "./count_messages";
import { countUpdates } from "./count_updates";
import { countUsers } from "./count_users";
import { getLanguagesByUsers } from "./languages_by_users";
import { getMostPopularBot } from "./most_popular_bot";
import { getMostPopularChatType } from "./most_popular_chat_type";
import { getMostPopularLanguage } from "./most_popular_language";
import { getMostPopularMessageType } from "./most_popular_message_type";
import { getMostPopularUpdateType } from "./most_popular_update_type";
import { getMostPopularUser } from "./most_popular_user";
import { getLastUpdate } from "./updates_last";
import { getLastCallbackQuery } from "./updates_last_callback_query";
import { getLastInlineQuery } from "./updates_last_inline_query";
import { getLastUser } from "./updates_last_user";
import { getUsersByEngagement } from "./users_by_engagement";

export const fetchers = {
	getMostPopularUser,
	getMostPopularBot,
	getMostPopularUpdateType,
	getMostPopularMessageType,
	getMostPopularChatType,
	countUsers,
	countUpdates,
	countMessages,
	countInlineQueries,
	countCallbackQueries,
	countInlineFeedbacks,
	getLastUpdate,
	getLastUser,
	getLastInlineQuery,
	getLastCallbackQuery,
	getUsersByEngagement,
	getBotsByEngagement,
	getMostPopularLanguage,
	getLanguagesByUsers,
	getChartDataUpdateTypes,
	getChartDataMessageTypes,
	getChartDataChatTypes,
};

export type Fetchers = typeof fetchers;
export type Fetcher = keyof Fetchers;
export type FetcherResult<T extends Fetcher> = Awaited<ReturnType<Fetchers[T]>>;
