import { render, screen } from "@testing-library/react";
import TableFilter from "../TableFilter";

describe("TableFilter component test", () => {
  it("Render TableFilter component", async () => {
    render(<TableFilter />);
    const tableFilter = await screen.findByTestId(/TableFilter/i);
    expect(tableFilter).toBeInTheDocument();
  });
});
