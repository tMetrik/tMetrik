import { json } from "@sveltejs/kit";
import { getReasonPhrase, StatusCodes } from "http-status-codes";

export function ok(result: unknown, init?: ResponseInit) {
	return json({ ok: true, result }, init);
}

export function err(result: unknown, init?: ResponseInit) {
	return json({ ok: false, result }, init);
}

export function errStatus(status: number) {
	return err(getReasonPhrase(status), { status });
}

export function okStatus(status: number) {
	return ok(getReasonPhrase(status), { status });
}

export function ok200() {
	return okStatus(StatusCodes.OK);
}
