import { render, screen } from "@testing-library/react";
import IconFilter from "../IconFilter";

describe("Icon Filter test", () => {
  it("Render FilterIcon", async () => {
    render(<IconFilter />);
    const iconFilter = await screen.findByTestId(/iconFilter/i);
    expect(iconFilter).toBeInTheDocument();
  });
  it("Should render IconFilter with props", async () => {
    render(<IconFilter isAvtive={true} />);
    const iconFilter = await screen.findByTestId(/iconFilter/i);
    expect(iconFilter).toBeInTheDocument();
  });
});
