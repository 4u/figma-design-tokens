var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fs from "fs";
export const ReadJsonFile = {
    from(str) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!fs.existsSync(str)) {
                throw new Error(`File not found: ${str}`);
            }
            const data = yield fs.promises.readFile(str, "utf-8");
            return JSON.parse(data);
        });
    },
};
//# sourceMappingURL=ReadJsonFile.js.map