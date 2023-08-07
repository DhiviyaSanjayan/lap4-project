import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <div>404</div>
      <Link to="/">Go Back To Dashboard</Link>
    </>
  );
}
