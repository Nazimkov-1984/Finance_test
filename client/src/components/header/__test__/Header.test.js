import { render, screen } from "@testing-library/react";
import Favorite from "../favorite/Favorite";
import Header from "../Header";

describe("Header test", () => {
  it("Render header logo", () => {
    render(<Header />);
    const logo = screen.getByAltText(/main logo/i);
    expect(logo).toBeInTheDocument();
  });
  it("Render header title", () => {
    render(<Header />);
    const title = screen.getByText(/Finance test task/i);
    expect(title).toBeInTheDocument();
  });
  it("Render FavoriteButton in header", () => {
    render(<Favorite />);
    const favorite = screen.getByText(/Favorite quote/i);
    expect(favorite).toBeInTheDocument();
  });
});
