import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders title", async () => {
  render(<App />);
  const titleElement = await screen.findByText(/Pokémon Battle/i);
  expect(titleElement).toBeInTheDocument();
});

test("renders random pokemon button", async () => {
  render(<App />);
  const buttonElement = await screen.findByText(/Select Random Pokémon/i);
  expect(buttonElement).toBeInTheDocument();
});

test("verify start battle button not visible", async () => {
  render(<App />);
  const buttonElement = screen.queryByText(/Start Battle!/i);
  expect(buttonElement).toBeNull();
});
