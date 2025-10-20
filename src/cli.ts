#!/usr/bin/env node

// https://www.figma.com/community/plugin/1457362132545070106/variable-visualizer-design-system-token-variables-management
// export full data

import "dotenv/config";
import yargs from "yargs";

import { parse, format } from "./index.js";
import { existsSync, writeFileSync } from "node:fs";
import { readFile } from "node:fs/promises";

async function main() {
  const argv = await yargs(process.argv.slice(2))
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

  const jsonData = JSON.parse(await readFile(argv.json, "utf-8"));
  const dictionary = parse((jsonData as any).collections, "Default");
  writeFileSync(argv.output, format(dictionary), "utf-8");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
