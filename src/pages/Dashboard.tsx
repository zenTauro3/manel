import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { State } from "../context/constants";

export default function Dashboard() {
  const { name, email } = useSelector((state: State) => state);

  const handleLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    Cookies.remove("token");
    window.location.href = "/";
  };

  return (
    <div className="app">
      <h1>Panel de control</h1>
      <div className="info">
        <span>Nombre: {name}</span>
        <span>Correo electrónico: {email}</span>
      </div>
      <button className="btn-danger" onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
}
