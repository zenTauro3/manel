import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import auth from "../services/auth";

export default function PublicRoute({ component }: { component: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(false);
  const token = Cookies.get("token");

  useEffect(() => {
    auth(token)
      .then(() => setUser(true))
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) {
    return null;
  } else {
    return user ? <Navigate to="/dashboard" /> : component;
  }
}
