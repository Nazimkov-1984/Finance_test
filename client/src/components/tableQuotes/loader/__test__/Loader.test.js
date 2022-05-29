import { render, screen } from "@testing-library/react";
import Loader from "../Loader";

describe("Icon Loader test", () => {
  it("Render icon Loader", async () => {
    render(<Loader />);
    const iconArrow = await screen.findByTestId(/circles-loading/i);
    expect(iconArrow).toBeInTheDocument();
  });
});
