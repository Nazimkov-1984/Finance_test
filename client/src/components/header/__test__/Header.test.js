import { fireEvent, render, screen } from "@testing-library/react";
import Favorite from "../favorite/Favorite";
import Header from "../Header";
import ModalFavoriteStore from "../../../store/favoriteModal";

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
    expect(favorite).toHaveClass("disabled");
  });
  it("Click to button Favorite", async () => {
    ModalFavoriteStore.setFavoriteDAta("Mock");
    render(<Favorite />);
    const favorite = screen.getByText(/Favorite quote/i);
    fireEvent.click(favorite);
    const modalFAvorite = await screen.findByText(/Favorite quotes/i);
    expect(modalFAvorite).toBeInTheDocument();
  });
});
