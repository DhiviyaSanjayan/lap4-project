import React from "react";
import styles from "./style.module.css";

export default function Logo() {
  return (
    <div className={styles["logo"]}>
      {/* <svg viewBox="490 -180 700 250">
        <text>Blossom</text>
      </svg>
      <svg viewBox="490 -180 700 250">
        <text>Gardens</text>
      </svg> */}
      <svg width="660" height="220">
        <defs>
          <mask id="text-mask-1" x="0" y="0" width="100" height="100">
            <text
              x="30"
              y="140"
            >
              Blossom Gardens
            </text>
          </mask>
        </defs>
        <image
          width="660"
          height="495"
          href="https://images.pexels.com/photos/355748/pexels-photo-355748.jpeg?cs=srgb&dl=pexels-pixabay-355748.jpg&fm=jpg"
          mask="url(#text-mask-1)"
        />
      </svg>
    </div>
  );
}
