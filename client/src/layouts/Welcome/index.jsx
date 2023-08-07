import React from "react";
import { Outlet } from "react-router-dom";

import style from "./style.module.css";

export default function Welcome() {

  return (
    <>
        <main className={style["container"]}>
          <Outlet />
        </main>
    </>
  );
}
