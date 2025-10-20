#!/usr/bin/env node
// https://www.figma.com/community/plugin/1457362132545070106/variable-visualizer-design-system-token-variables-management
// export full data
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import "dotenv/config";
import yargs from "yargs";
import { parse, format } from "./index.js";
import { existsSync, writeFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const argv = yield yargs(process.argv.slice(2))
            .options({
            json: { type: "string" },
            output: { type: "string" },
        })
            .parse();
        if (!argv.json || !argv.output) {
            console.error("Usage: design-tokens <json> <output>");
            process.exit(1);
        }
        if (!existsSync(argv.json)) {
            throw new Error(`File not found: ${argv.json}`);
        }
        const jsonData = JSON.parse(yield readFile(argv.json, "utf-8"));
        const dictionary = parse(jsonData.collections, "Default");
        writeFileSync(argv.output, format(dictionary), "utf-8");
    });
}
main().catch((err) => {
    console.error(err);
    process.exit(1);
});
//# sourceMappingURL=cli.js.map