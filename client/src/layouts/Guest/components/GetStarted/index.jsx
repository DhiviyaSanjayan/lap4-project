import React, { useLayoutEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import style from "./style.module.css";
import { useAuth } from "../../../../contexts";
import { ReactComponent as Arrow } from "../../../../assets/images/arrow.svg";
import smileyStyles from "./smiley.module.css";

export default function GetStarted() {
  const goTo = useNavigate();
  const { user } = useAuth();
  const { pathname } = useLocation();
  const transition = pathname !== "/" ? style["on-lr"] : "";
  
  return (
    <>
      <button
        className={`${style["get-started"]} ${user ? style["auth"] : ""} ${transition}`}
        
      >
        <div className={style["prompt"]}>
          <Arrow />
          <p>
            Click to <br />
            Start Gardening
          </p>
        </div>
        <div className={smileyStyles["smiley"]} onClick={() => goTo("/login")}>
          <span></span>
          <div className={smileyStyles["eyes"]}>
            <div className={smileyStyles["eye"]}></div>
            <div className={smileyStyles["eye"]}></div>
          </div>
          <div className={smileyStyles["mouth"]}></div>
        </div>
      </button>
    </>
  );
}
