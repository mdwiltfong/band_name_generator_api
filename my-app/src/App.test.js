import { fireEvent, render, waitFor } from "@testing-library/react";
import { scryRenderedComponentsWithType } from "react-dom/test-utils";
import App from "./App";

describe("App component unit tests", () => {
  beforeEach(() => {
    /* TODO: Add dbReset function to these tests to preserve db */
  });
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
  it("a list of bandnames should appear when list-bandnames-btn is clicked", () => {
    const screen = render(<App />);
    const listBtn = screen.getByText("See a list of upvoted band names!");
    fireEvent.click(listBtn);
    const bandList = screen.container.getElementsByClassName("band");
    screen.debug();
    expect(bandList.length).not.toBe(null);
  });
  it.todo("User can add bandname to database");
  /* Click on "What should we call the band" Is there a Add band button? When we click it, does it 
  // show the confirmation message? Can it show the error message? 
  Does the new bandname hit the BandResult component? 
  
  */
});
