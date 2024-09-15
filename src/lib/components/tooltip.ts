import type { User } from "$lib/server/clickhouse/ops/most_popular_user";
import type { UserWithEngagementCount } from "$lib/server/clickhouse/ops/users_by_engagement";

export declare namespace TooltipData {
	export type UserInfo = {
		_: "userInfo";
	} & (User | UserWithEngagementCount);

	export type Text = { _: "text"; text: string };
}

export type TooltipData = TooltipData.UserInfo | TooltipData.Text | null;
