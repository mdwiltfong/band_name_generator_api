import { fireEvent, render, waitFor } from "@testing-library/react";
import BandList from "./components/band_list/BandList";

describe("LikeButton tests", () => {
  it("Smoketest", () => {
    render(<BandList />);
  });
  it("See a list ....", async () => {
    const screen = render(<BandList />);
    const listBtn = screen.getByText("See a list of upvoted band names!");
    expect(listBtn).toBeInTheDocument();
  });
});
