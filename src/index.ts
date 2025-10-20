// https://www.figma.com/community/plugin/1457362132545070106/variable-visualizer-design-system-token-variables-management
// export full data

import "dotenv/config";

import { command, run, positional, string } from "cmd-ts";
import { ReadJsonFile } from "./args/ReadJsonFile";
import { parse } from "./utils/parser";
import { format } from "./utils/formatter";
import { writeFileSync } from "node:fs";

const app = command({
  name: "design-tokens",
  args: {
    json: positional({ type: ReadJsonFile, displayName: "file" }),
    output: positional({ type: string, displayName: "output" }),
  },
  handler: async ({ json, output }) => {
    const dictionary = parse((json as any).collections, "Default");
    writeFileSync(output, format(dictionary), "utf-8");
  },
});

// parse arguments
run(app, process.argv.slice(2));
