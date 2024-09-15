import { populateKeys } from "$lib/server/keys";
import type { Handle } from "@sveltejs/kit";
import { StatusCodes } from "http-status-codes";
import { readFile } from "node:fs/promises";

populateKeys();

/** @type {import('@sveltejs/kit').Handle} */
export const handle: Handle = async ({ event, resolve }) => {
	if (event.request.method == "POST") {
		return await resolve(event);
	}
	let users = new Array<string>();
	try {
		users = JSON.parse((await readFile("users.json")).toString());
		if (!Array.isArray(users) || !users.every(v => typeof v === "string")) {
			return await resolve(event);
		}
	} catch {
		//
	}
	if (users.length != 0 && !users.some(v => event.request.headers.get("authorization") == `Basic ${btoa(v)}`)) {
		return new Response(null, {
			status: StatusCodes.UNAUTHORIZED,
			headers: {
				"www-authenticate": "Basic realm=\"\", charset=\"UTF-8\"",
			},
		});
	}

	return await resolve(event);
};
