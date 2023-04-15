import { render } from "@testing-library/react";
import SignUpForm from "./SignUpForm";

describe("SignUpForm Tests", () => {
  it("Smoketest", () => {
    render(<SignUpForm />);
  });
});
