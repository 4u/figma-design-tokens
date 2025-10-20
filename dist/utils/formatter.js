import { readFileSync } from "fs";
import { resolve } from "path";
const __dirname = new URL(".", import.meta.url).pathname;
const repoDir = resolve(__dirname, "../..");
function getVariableType(type) {
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
function getArgsForType(type, value) {
    switch (type) {
        case "COLOR":
            if (value.r !== undefined &&
                value.g !== undefined &&
                value.b !== undefined) {
                return `[${Math.round(value.r * 255)}, ${Math.round(value.g * 255)}, ${Math.round(value.b * 255)}, ${value.a}]`;
            }
            else {
                throw new Error(`Color value must be an object with r, g, b properties`);
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
function buildExportLine(name, type, args) {
    return `  "${name}": new ${type}Token(${args}),`;
}
function buildExportLines(data) {
    const items = [...data.entries()].map(([name, { variable, resolvedValue }]) => ({
        name,
        type: getVariableType(variable.resolvedType),
        args: getArgsForType(variable.resolvedType, resolvedValue),
    }));
    items.sort((a, b) => a.name.localeCompare(b.name));
    return (`\n` +
        items
            .map(({ name, type, args }) => buildExportLine(name, type, args))
            .join("\n") +
        "\n");
}
export function format(data) {
    const header = readFileSync(resolve(repoDir, "src/helpers/header.ts"), "utf-8");
    return `
${header}
export const tokens = {${buildExportLines(data)}}
  `.trim();
}
//# sourceMappingURL=formatter.js.map