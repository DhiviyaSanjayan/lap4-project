import React from "react";
import { Outlet } from "react-router-dom";

import style from "./style.module.css";

export default function Guest() {
  return (
    <>
      <main className={style["container"]}>
        <Outlet />
      </main>
    </>
  );
}
