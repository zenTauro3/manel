import React, { useState } from "react";
import Cookies from "js-cookie";
import register from "../services/register";
import { Link, useNavigate } from "react-router-dom";
import { setName, setEmail, setPassword } from "../context/actions";
import { useSelector, useDispatch } from "react-redux";
import { State } from "../context/constants";
import back from "../assets/back.png";

export default function Register() {
  const { name, email, password } = useSelector((state: State) => state);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setName(event.target.value));
  };

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmail(event.target.value));
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPassword(event.target.value));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    register(name, email, password)
      .then((token) => {
        Cookies.set("token", token);
        navigate("/dashboard");
      })
      .catch((error) => {
        setMessage(error.message);
        error.type == "name" ? setNameError(true) : setNameError(false);
        error.type == "email" ? setEmailError(true) : setEmailError(false);
        error.type == "password" ? setPasswordError(true) : setPasswordError(false);
      });
  };

  return (
    <div className="app">
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <div className="top">
            <Link className="back" to="/">
              <img src={back} alt="Volver" />
            </Link>
            <h1 className="title">Crear cuenta</h1>
          </div>
          <input
            className={nameError ? "control alert" : "control"}
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={handleName}
          />
          <input
            className={emailError ? "control alert" : "control"}
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={handleEmail}
          />
          <input
            className={passwordError ? "control alert" : "control"}
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={handlePassword}
          />
          <button className="btn" type="submit">
            Registrarse
          </button>
          {message && <span className="error">{message}</span>}
          <Link className="changer" to="/login">
            Ya tienes una cuenta?
          </Link>
        </form>
      </div>
    </div>
  );
}
