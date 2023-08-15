import React from "react";
import { NavLink, Outlet, Navigate, Link } from "react-router-dom";

import { useAuth } from "../../contexts";

import style from "./style.module.css";

export default function User() {
  const { user } = useAuth();
  return user ? (
    <>
      <div id="user-wrapper" className={style["container"]}>
        <header className={style["nav-bar"]}>
          <nav className={style["nav"]}>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/plant-identifier">Plant Identifier</NavLink>
            <NavLink to="/plants">Plants</NavLink>
            <NavLink to="/addplant">Add Plant</NavLink>
            <NavLink to="/garden">Garden</NavLink>
            <NavLink to="/addplant">Add a Plant</NavLink>
            <NavLink to="/profile">Profile</NavLink>
          </nav>
        </header>
        <Outlet />
      </div>
    </>
  ) : (
    <Navigate to="/" />
  );
}
