"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function auth(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = request.headers['authorization'];
            const decoded = jsonwebtoken_1.default.verify(token || "", process.env.JWT || "");
            const userInfo = { name: decoded.name, email: decoded.email };
            response.status(200).send(userInfo);
        }
        catch (_a) {
            response.status(401).send();
        }
    });
}
exports.default = auth;
