import { Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import users from "../models/users";
import bcrypt from "bcrypt";

export default async function login(request: Request, response: Response) {
  try {
    const { email, password } = request.body;

    //validar campos
    const validateEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    const validatePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,50}$/.test(password);

    if(!validateEmail) return response.status(400).send({message: "El correo electrónico no es válido", type: "email"});
    if(!validatePassword) return response.status(400).send({message: "La contraseña debe tener entre 8-50 mayusculas, minúsculas y números", type: "password"})

    //comprobar base de datos
    const emailExists = await users.findOne({ email });
    const comparePass = await bcrypt.compare(password, emailExists?.password || "")

    if(!emailExists) return response.status(400).send({message: "El correo electrónico no está registrado aún", type: "email"});
    if(!comparePass) return response.status(400).send({message: "La contraseña es incorrecta", type: password});

    const token = jsonwebtoken.sign({ name: emailExists.name, email }, process.env.JWT || "", {expiresIn: "2h"});
    return response.status(200).send(token);
  } catch (error) {
    return response.status(500).send("Error del servidor, intentalo más tarde");
  }
}
