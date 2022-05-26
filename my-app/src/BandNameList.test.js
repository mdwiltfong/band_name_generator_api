import { fireEvent, render, waitFor } from "@testing-library/react";
import BandNameList from "./component/BandNameList";

describe("LikeButton tests", () => {
  it("Smoketest", () => {
    render(<BandNameList />);
  });
  it("See a list ....", async () => {
    const screen = render(<BandNameList />);
    const listBtn = screen.getByText("See a list of upvoted band names!");
    expect(listBtn).toBeInTheDocument();
  });
});
