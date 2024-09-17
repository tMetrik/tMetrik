import type fetchers from "$lib/server/clickhouse/ops/_ops";
import type { User } from "$lib/server/clickhouse/ops/most_popular_user";

export type Fetcher = keyof typeof fetchers;
export type FetcherResult<T extends Fetcher> = Awaited<ReturnType<(typeof fetchers)[T]>>;

export const idFormat = new Intl.NumberFormat("ru");

export const numberFormat = new Intl.NumberFormat();

const ACCEPTIBLE_NAME = /^[ЁёА-яA-Za-z ]$/;
export function formatFrom(user: User | FetcherResult<"most_popular_bot">) {
	if (user.username) {
		return "@" + user.username;
	}
	let name = user.firstName;
	if (user.lastName) {
		name += " " + user.lastName;
	}
	if (ACCEPTIBLE_NAME.test(name)) {
		return name;
	}
	if ("title" in user) {
		if (ACCEPTIBLE_NAME.test(user.title)) {
			return user.title;
		}
	}
	return idFormat.format(user.id);
}

export const CHART_COLORS = [
	"#778899",
	"#DEB887",
	"#8FBC8F",
	"#B22222",
	"#5F9EA0",
	"#F4A460",
	"#9370DB",
	"#A0522D",
	"#6B8E23",
	"#CD853F",
	"#B0E0E6",
	"#8B4513",
	"#EEE8AA",
	"#DC143C",
	"#D8BFD8",
	"#708090",
	"#FA8072",
	"#BDB76B",
	"#5B7065",
	"#F0E68C",
	"#B18F6A",
	"#E0FFFF",
	"#A52A2A",
	"#DDA0DD",
	"#7D8C8A",
	"#CD5C5C",
	"#D2B48C",
	"#87CEEB",
	"#800000",
	"#DAA520",
	"#94A89A",
	"#F08080",
	"#FFDAB9",
	"#4682B4",
	"#8B0000",
	"#FFE4B5",
	"#C2B2B4",
	"#E9967A",
	"#B0C4DE",
	"#D2691E",
	"#FFA07A",
	"#A0522D",
	"#FFDAB9",
	"#6B8E23",
	"#D2691E",
	"#B18F6A",
	"#778899",
	"#8FBC8F",
	"#DEB887",
	"#5F9EA0",
];
