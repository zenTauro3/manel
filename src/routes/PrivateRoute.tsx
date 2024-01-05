import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import auth from "../services/auth";
import { useDispatch } from "react-redux";
import { setName, setEmail } from "../context/actions";

export default function PrivateRoute({ component }: { component: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(true);
  const token = Cookies.get("token");
  const dispatch = useDispatch();

  useEffect(() => {
    auth(token)
      .then((data) => {
        dispatch(setName(data.name));
        dispatch(setEmail(data.email));
      })
      .catch(() => setUser(false))
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) {
    return null;
  } else {
    return user ? component : <Navigate to="/login" />
  }
}
