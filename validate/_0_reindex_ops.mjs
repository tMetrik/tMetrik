// @ts-check
import { writeFileSync } from "node:fs";
import { getOpSlugs } from "./_.mjs";

let imports = "";
let map = "export default {\n";

for (const slug of getOpSlugs()) {
	imports += `import ${slug} from "./${slug}";\n`;
	map += `  ${slug},\n`;
}

map += "};\n";

writeFileSync("./src/lib/server/clickhouse/ops/_ops.ts", imports + "\n" + map);
