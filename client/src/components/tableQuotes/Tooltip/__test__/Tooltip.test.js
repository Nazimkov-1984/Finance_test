import { render, screen } from "@testing-library/react";
import Tooltip from "../Tooltip";

describe("Tooltip component test", () => {
  it("Render Tooltip", async () => {
    render(<Tooltip />);
    const tooltip = await screen.findByText(/Click to open details.../i);
    expect(tooltip).toBeInTheDocument();
  });
});
