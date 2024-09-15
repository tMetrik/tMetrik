export function sql(array: TemplateStringsArray, ...args: unknown[]) {
	let i = 0;
	return array.map((v) => v + (args[i++] ?? "")).join("");
}
