import { fireEvent, render, waitFor } from "@testing-library/react";
import { dbReset } from "../../db/dbFunctions";
import App from "./App";
require("dotenv").config({ path: "../.env" });
import {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} from "./_tests_/_testCommon";

beforeAll(async () => {
  await commonBeforeAll("bands");
});
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);

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
      const addBtn = screen.getByTestId("add-band-btn");

      expect(addBtn).toBeInTheDocument();
    });
  });
  it("a list of bandnames should appear when list-bandnames-btn is clicked", () => {
    const screen = render(<App />);
    const listBtn = screen.getByText("See a list of upvoted band names!");
    fireEvent.click(listBtn);
    const bandList = screen.container.getElementsByClassName("band");
    expect(bandList.length).not.toBe(null);
  });
  it("User can add bandname to database", async () => {
    const screen = render(<App />);
    const generateBndNameBtn = screen.getByText(
      "What should we call the band?"
    );
    fireEvent.click(generateBndNameBtn);
    const bandResult = screen.container.getElementsByClassName("band-result");
    expect(bandResult);
    const addBnd = await screen.findByText("Add Band");
    fireEvent.click(addBnd);
    const appMsg = screen.container.getElementsByClassName("App-message");
    expect(appMsg);
  });
});
