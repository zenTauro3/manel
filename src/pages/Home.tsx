import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="app">
      <div className="navbar">
        <h1 className="left">Bienvenido</h1>
        <div className="right">
          <Link className="link" to="/register">Créate una cuenta</Link>
          <Link className="link" to="/login">Inicia sesión</Link>
        </div>
      </div>
    </div>
  );
}
