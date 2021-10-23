import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

it("Has a primary color search box", () => {
  render(<App />);
  screen.getByRole("input");
});
