// @ts-check
import { existsSync, readdirSync, writeFileSync } from "node:fs";
import { getOpSlugs, getViewFileName, getViewIdentifier } from "./_.mjs";

let fail = false;
const fileNames = [];
for (const slug of getOpSlugs()) {
	const fileName = getViewFileName(slug);
	if (!existsSync(`./src/lib/views/${fileName}`)) {
		console.log("Missing", fileName);
		fail = true;
	}
	fileNames.push(fileName);
}

for (const file of readdirSync("./src/lib/views")) {
	if (file.startsWith("_")) {
		continue;
	}
	if (!fileNames.includes(file)) {
		console.log("Unknown", file);
		fail = true;
	}
}

if (fail) {
	process.exit(1);
}

let imports = `import type { SvelteComponent } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import type { Fetcher, FetcherResult } from "./_utils.ts";
`;
let array = `interface View<T extends Fetcher = Fetcher> {
	fetcher: T;
	component: typeof SvelteComponent<
		{ data: FetcherResult<T> } & HTMLAttributes<HTMLDivElement>
	>;
}

export const views: View[] = [
`;

for (const slug of getOpSlugs()) {
	const identifier = getViewIdentifier(slug);
	const fileName = getViewFileName(slug);
	imports += `import ${identifier} from "./${fileName}";\n`;
	array += `{
	fetcher: "${slug}",
	component: ${identifier},
},
`;
}

array += "];\n";

writeFileSync(`./src/lib/views/_views.ts`, imports + "\n" + array);
