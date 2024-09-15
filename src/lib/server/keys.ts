import { readFile, writeFile } from "fs/promises";
import { z } from "zod";

const KEYS_FILE = ".keys";
export const keys = new Array<string>();

export async function populateKeys() {
	try {
		const contents = (await readFile(KEYS_FILE)).toString();
		keys.push(...z.array(z.string().uuid()).parse(contents.split("\n").map(v => v.trim()).filter(v => v)));
		keys.length && console.error(keys.length, "existing key(s) were loaded.");
	} catch {
		//
	}
	if (!keys.length) {
		for (let i = 0; i < 100; ++i) {
			keys.push(crypto.randomUUID());
		}
		try {
			await writeFile(KEYS_FILE, keys.join("\n"));
			console.log(keys.length, "new keys were written.");
		} catch (err) {
			console.error("Failed to write new keys", err);
			process.exit(1);
		}
	}
	for (const i in keys) {
		keys[i] = keys[i].toLowerCase();
	}
}
