import type { ParsedVariables, Variable } from "./parser.js";
import { readFileSync } from "fs";

function getVariableType(
  type: Variable["resolvedType"]
): "Color" | "Number" | "String" | "Boolean" {
  switch (type) {
    case "COLOR":
      return "Color";
    case "FLOAT":
      return "Number";
    case "STRING":
      return "String";
    case "BOOLEAN":
      return "Boolean";
    default:
      throw new Error(`Unsupported variable type: ${type}`);
  }
}
function getArgsForType(type: Variable["resolvedType"], value: any): string {
  switch (type) {
    case "COLOR":
      if (
        value.r !== undefined &&
        value.g !== undefined &&
        value.b !== undefined
      ) {
        return `[${Math.round(value.r * 255)}, ${Math.round(
          value.g * 255
        )}, ${Math.round(value.b * 255)}, ${value.a}]`;
      } else {
        throw new Error(
          `Color value must be an object with r, g, b properties`
        );
      }
    case "FLOAT":
      if (typeof value !== "number") {
        throw new Error(`Number value must be a number`);
      }

      return `${value}`;
    case "STRING":
      if (typeof value !== "string") {
        throw new Error(`String value must be a string`);
      }

      return JSON.stringify(value);
    case "BOOLEAN":
      if (typeof value !== "boolean") {
        throw new Error(`Boolean value must be a boolean`);
      }

      return value ? "true" : "false";
    default:
      throw new Error(`Unsupported variable type: ${type}`);
  }
}

function buildExportLine(
  name: string,
  type: "Color" | "Number" | "String" | "Boolean",
  args: string
) {
  return `  "${name}": new ${type}Token(${args}),`;
}

function buildExportLines(data: ParsedVariables) {
  const items = [...data.entries()].map(
    ([name, { variable, resolvedValue }]) => ({
      name,
      type: getVariableType(variable.resolvedType),
      args: getArgsForType(variable.resolvedType, resolvedValue),
    })
  );

  items.sort((a, b) => a.name.localeCompare(b.name));
  return (
    `\n` +
    items
      .map(({ name, type, args }) => buildExportLine(name, type, args))
      .join("\n") +
    "\n"
  );
}

export function format(data: ParsedVariables): string {
  const header = readFileSync("src/helpers/header.ts", "utf-8");
  return `
${header}
export const tokens = {${buildExportLines(data)}}
  `.trim();
}
