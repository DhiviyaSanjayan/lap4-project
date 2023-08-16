import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts";
import { Logo, Backgrounds, GetStarted } from "./components";
import style from "./style.module.css";

export default function Guest() {
  const goTo = useNavigate();
  const { user } = useAuth();

  //if user already logged go directly to virtual garden
  useEffect(() => {
    if (user) goTo("/garden");
  }, []);

  return (
    <>
      <main className={style["container"]}>
        <Backgrounds />
        {/* <Logo /> */}
        <GetStarted />
        <Outlet />
      </main>
    </>
  );
}
