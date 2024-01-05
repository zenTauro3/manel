import { Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import users from "../models/users";
import bcrypt from "bcrypt";

export default async function register(request: Request, response: Response) {
  try {
    const { name, email, password } = request.body;

    //validar campos
    const validateName = /^[a-zA-Z0-9_]{8,20}$/.test(name);
    const validateEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    const validatePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,50}$/.test(password);

    if(!validateName) return response.status(400).send({message: "El nombre debe tener entre 8-20 caracteres alfanuméricos", type: "name"})
    if(!validateEmail) return response.status(400).send({message: "El correo electrónico no es válido", type: email});
    if(!validatePassword) return response.status(400).send({message: "La contraseña debe tener entre 8-50 mayusculas, minúsculas y números", type: "password"})

    //comprobar base de datos
    const nameExists = await users.findOne({ name });
    const emailExists = await users.findOne({ email });

    if(nameExists) return response.status(400).send({message: "Este nombre ya esta registrado, prueba otro", type: "name"});
    if(emailExists) return response.status(400).send({message: "Este email ya esta registrado, prueba otro", type: 'email'})

    const hashed = await bcrypt.hash(password, 10);
    const user = new users({name, email, password: hashed});
    await user.save();

    const token = jsonwebtoken.sign({ name, email }, process.env.JWT || "", {expiresIn: "2h"});
    return response.status(200).send(token);
  } catch (error) {
    return response.status(500).send("Error del servidor, intentalo más tarde");
  }
}
