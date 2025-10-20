import {
  ParsedJSONTokenTree,
  parseJSONTokenTree,
} from "@nclsndr/w3c-design-tokens-parser";
import { Type } from "cmd-ts";
import fs from "fs";

export const ReadJsonFile: Type<string, Record<string, unknown[]> | unknown[]> =
  {
    async from(str) {
      if (!fs.existsSync(str)) {
        throw new Error("File not found");
      }

      const data = await fs.promises.readFile(str, "utf-8");
      return JSON.parse(data);
    },
  };
