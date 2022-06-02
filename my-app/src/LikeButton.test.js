import { fireEvent, render, waitFor } from "@testing-library/react";
import { getElementsByTagName } from "domutils";
import BandList from "./components/band_list/BandList";

import LikeButton from "./components/band_list/LikeButton";

describe("LikeButton tests", () => {
  it("Smoketest", () => {
    render(<LikeButton />);
  });
  it("LikeButton has like_buttons class", async () => {
    const likes = 24;
    const screen = render(<LikeButton likes={likes} />);
    const DOM = screen.container;
    screen.debug();
    const spanBtn = DOM.querySelector(".like_buttons");
    expect(spanBtn.className).toBe("like_buttons");
  });
  it("LikeButton renders likes,bandname, and id", async () => {
    const likes = 24;
    const bandname = "Test band";
    const screen = render(<LikeButton likes={likes} bandname={bandname} />);
    const bandName = screen.getByText("Test band");
    const likeNumber = screen.getByText("24");
    expect(bandName).toBeInTheDocument();
    expect(likeNumber).toBeInTheDocument();
  });
});
