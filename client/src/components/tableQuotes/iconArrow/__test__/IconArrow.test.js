import { render, screen } from "@testing-library/react";
import IconArrow, { ENUM_ARROW_COLOR } from "../IconArrow";

describe("Icon Arrow test", () => {
  it("Render iconArrow", async () => {
    render(<IconArrow />);
    const iconArrow = await screen.findByTestId(/iconArrow/i);
    expect(iconArrow).toBeInTheDocument();
  });
  it("Should render IconArrow  with props", async () => {
    render(<IconArrow color={ENUM_ARROW_COLOR.RED} />);
    const iconArrow = await screen.findByTestId(/iconArrow/i);
    expect(iconArrow).toBeInTheDocument();
  });
});
