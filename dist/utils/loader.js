var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { writeFileSync } from "fs";
const FIGMA_TOKEN = process.env.FIGMA_TOKEN;
const FILE_ID = process.env.FIGMA_FILE_ID;
if (!FIGMA_TOKEN || !FILE_ID) {
    throw new Error("Please set FIGMA_TOKEN and FIGMA_FILE_ID in your environment variables.");
}
const headers = {
    "X-Figma-Token": FIGMA_TOKEN,
};
function fetchVariables() {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `https://api.figma.com/v1/files/${FILE_ID}`;
        console.log(`Fetching variables from Figma file ID: ${url}`);
        const response = yield fetch(url, {
            headers,
        });
        if (!response.ok) {
            const text = yield response.text();
            throw new Error(`Figma API error: ${response.status} ${text}`);
        }
        writeFileSync("./figma-response.json", yield response.text(), "utf-8");
        const data = yield response.json();
        return data;
    });
}
export function load() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield fetchVariables();
        return data;
    });
}
//# sourceMappingURL=loader.js.map