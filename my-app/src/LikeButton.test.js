import { fireEvent, render, waitFor } from "@testing-library/react";
import { getElementsByTagName } from "domutils";
import BandNameList from "./component/BandNameList";

import LikeButton from "./component/LikeButton";

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
