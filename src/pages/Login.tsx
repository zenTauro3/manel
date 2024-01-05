import React, { useState } from "react";
import Cookies from "js-cookie";
import login from "../services/login";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../context/constants";
import { setEmail, setPassword } from "../context/actions";
import back from "../assets/back.png";

export default function Login() {
  const { email, password } = useSelector((state: State) => state);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmail(event.target.value));
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPassword(event.target.value));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login(email, password)
      .then((token) => {
        Cookies.set("token", token);
        navigate("/dashboard");
      })
      .catch((error) => {
        setMessage(error);
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
            <h1 className="title">Ingresar</h1>
          </div>
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
            Iniciar sesión
          </button>
          {message && <span className="error">{message}</span>}
          <Link className="changer" to="/register">
            Aún no estás registrado?
          </Link>
        </form>
      </div>
    </div>
  );
}
