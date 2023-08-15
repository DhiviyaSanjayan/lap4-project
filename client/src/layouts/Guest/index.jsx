import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Backgrounds from "./index";

test("renders Gloves background with 'on-login' style on /login page", () => {
  const { getByTestId } = render(
    <MemoryRouter initialEntries={["/login"]}>
      <Backgrounds />
    </MemoryRouter>
  );
  const gloves = getByTestId("gloves");

  expect(gloves).toHaveClass("on-login");
});
