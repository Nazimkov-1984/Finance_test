import { fireEvent, render, screen } from "@testing-library/react";
import ButtonAddToFavorite from "../buttonAddToFavorite/ButtonAddToFavorite";
import IconClose from "../IconClose/IconClose";

describe("Icon close in modal test", () => {
  it("Render icon close", async () => {
    render(<IconClose />);
    const iconClose = await screen.findByTestId(/iconClose/i);
    expect(iconClose).toBeInTheDocument();
  });
  it("IconClose to be clicked", async () => {
    render(<IconClose />);
    const iconClose = await screen.findByTestId(/iconClose/i);
    fireEvent.click(iconClose);
  });
  it("Render AddToFavorite button", async () => {
    render(<ButtonAddToFavorite />);
    const buttonAddToFavorite = await screen.findByText(/Add to favorite/i);
    expect(buttonAddToFavorite).toBeInTheDocument();
  });
});
