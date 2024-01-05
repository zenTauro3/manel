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
const users_1 = __importDefault(require("../models/users"));
const bcrypt_1 = __importDefault(require("bcrypt"));
function register(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, email, password } = request.body;
            //validar campos
            const validateName = /^[a-zA-Z0-9_]{8,20}$/.test(name);
            const validateEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
            const validatePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,50}$/.test(password);
            if (!validateName)
                return response.status(400).send({ message: "El nombre debe tener entre 8-20 caracteres alfanuméricos", type: "name" });
            if (!validateEmail)
                return response.status(400).send({ message: "El correo electrónico no es válido", type: email });
            if (!validatePassword)
                return response.status(400).send({ message: "La contraseña debe tener entre 8-50 mayusculas, minúsculas y números", type: "password" });
            //comprobar base de datos
            const nameExists = yield users_1.default.findOne({ name });
            const emailExists = yield users_1.default.findOne({ email });
            if (nameExists)
                return response.status(400).send({ message: "Este nombre ya esta registrado, prueba otro", type: "name" });
            if (emailExists)
                return response.status(400).send({ message: "Este email ya esta registrado, prueba otro", type: 'email' });
            const hashed = yield bcrypt_1.default.hash(password, 10);
            const user = new users_1.default({ name, email, password: hashed });
            yield user.save();
            const token = jsonwebtoken_1.default.sign({ name, email }, process.env.JWT || "", { expiresIn: "2h" });
            return response.status(200).send(token);
        }
        catch (error) {
            return response.status(500).send("Error del servidor, intentalo más tarde");
        }
    });
}
exports.default = register;
