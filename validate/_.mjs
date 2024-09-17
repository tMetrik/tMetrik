// @ts-check
import { readdirSync } from "node:fs";

export function getOpSlugs() {
	const slugs = [];
	for (const file of readdirSync("./src/lib/server/clickhouse/ops")) {
		if (file.startsWith("_")) {
			continue;
		}
		const slug = file.split(".")[0];
		if (slug) {
			slugs.push(slug);
		}
	}
	return slugs;
}

export function getViewIdentifier(/** @type {string} */ slug) {
	return slug.replace(/(^|_)(\w)/g, (_, __, c) => c.toUpperCase());
}

export function getViewFileName(/** @type {string} */ slug) {
	return getViewIdentifier(slug) + ".svelte";
}
