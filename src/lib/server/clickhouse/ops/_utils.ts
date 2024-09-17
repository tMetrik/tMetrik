import { ChatType } from "$lib/core/entry/chat_type";
import { client } from "../client";

export interface UserRaw {
	from: string;
	from_bot: boolean;
	from_username: string;
	from_firstname: string;
	from_lastname: string;
	from_languagecode: string;
	from_premium: boolean;
	from_type: ChatType;
	from_title: string;
}
export async function getUsers<T = {}, X extends UserRaw & T = UserRaw & T>(
	query: string,
): Promise<X[]> {
	const result = await client.query({ query });
	return (await result.json<X>()).data;
}

export function toPercentageString(number: number) {
	return (number * 100).toFixed(0) + "%";
}
