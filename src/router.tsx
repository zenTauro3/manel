import { createBrowserRouter, Navigate } from "react-router-dom";

import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";

import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";

import "./styles/auth.css"
import "./styles/home.css"
import "./styles/dashboard.css";
import "./index.css";

const router = createBrowserRouter([
  { path: "*", element: <PublicRoute component={<Navigate to="/" />} /> },
  { path: "/", element: <PublicRoute component={<Home />} /> },
  { path: "/login", element: <PublicRoute component={<Login />} /> },
  { path: "/register", element: <PublicRoute component={<Register />} /> },
  { path: "/dashboard", element: <PrivateRoute component={<Dashboard />} /> },
]);

export default router;
