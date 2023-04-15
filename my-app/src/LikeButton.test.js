import { render } from "@testing-library/react";

import LikeButton from "./components/band_list/LikeButton";

describe("LikeButton tests", () => {
  it("Smoketest", () => {
    render(<LikeButton />);
  });
  it("LikeButton has like_buttons class", async () => {
    const likes = 24;
    const screen = render(<LikeButton likes={likes} />);
    const DOM = screen.container;
    const spanBtn = DOM.querySelector(".like_buttons");
    expect(spanBtn.className).toContain("like_buttons");
  });
  it("LikeButton renders likes", async () => {
    const likes = 24;
    const screen = render(<LikeButton likes={likes} />);
    const likeNumber = screen.getByText("24");
    expect(likeNumber).toBeInTheDocument();
  });
});
