import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import style from "./style.module.css";
import { useAuth } from "../../contexts";

export default function GetStarted() {
  const goTo = useNavigate();
  const { user } = useAuth();

  //if user already logged go directly to dashboard
  useEffect(() => {
    if (user) goTo("/dashboard");
  },[]);

  return (
    <>
      <div id="get-started" className={style["container"]}>
        <button
          className={style["get-started"]}
          onClick={() => goTo("/login")}
        >
          Get Started
        </button>
      </div>
    </>
  );
}
