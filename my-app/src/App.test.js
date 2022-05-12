import { fireEvent, render, waitFor } from "@testing-library/react";
import App from "./App";

describe("App component unit tests", () => {
  it("Smoke Test", () => {
    render(<App />);
  });
  it("Snapshot tests", () => {
    const screen = render(<App />);
    expect(screen.asFragment()).toMatchSnapshot();
  });
  it("should generate random bandname when button is clicked", async () => {
    const screen = render(<App />);
    const generateBtn = screen.getByTestId("generate-btn");
    fireEvent.click(generateBtn);

    await waitFor(() => {
      screen.debug();
      const addBtn = screen.getByTestId("add-band-btn");
      screen.debug();
      expect(addBtn).toBeInTheDocument();
    });
  });
  it.todo(
    "a list of bandnames should appear when list-bandnames-btn is clicked"
  );
});
