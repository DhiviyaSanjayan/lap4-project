import React from "react";
import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import Logo from "./index";

describe("Logo Component", () => {
  it("renders without crashing", () => {
    render(<Logo />);
  });
});
