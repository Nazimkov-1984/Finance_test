import { fireEvent, render, screen } from "@testing-library/react";
import ButtonAddToFavorite from "../buttonAddToFavorite/ButtonAddToFavorite";
import IconClose from "../IconClose/IconClose";
import Modal from "../Modal";
import ModalStore from "../../../store/modal";
import ButtonClose from "../buttonClose/ButtonClose";

describe("Modal tests", () => {
  it("Render IconClose", async () => {
    render(<IconClose />);
    const iconClose = await screen.findByTestId(/iconClose/i);
    expect(iconClose).toBeInTheDocument();
  });
  it("IconClose to be clicked", async () => {
    render(<IconClose />);
    const iconClose = await screen.findByTestId(/iconClose/i);
    ModalStore.toggleModal();
    render(<Modal />);
    const modal = await screen.findByTestId(/modal/i);
    expect(modal).toBeInTheDocument();
    fireEvent.click(iconClose);
    expect(modal).not.toBeInTheDocument();
  });
  it("Render AddToFavorite button", async () => {
    render(<ButtonAddToFavorite />);
    const buttonAddToFavorite = await screen.findByText(/Add to favorite/i);
    expect(buttonAddToFavorite).toBeInTheDocument();
  });
  it("Click to AddFavoriteButton", async () => {
    ModalStore.toggleModal();
    render(<Modal />);
    const buttonAddToFavorite = await screen.findByText(/Add to favorite/i);
    fireEvent.click(buttonAddToFavorite);
    expect(buttonAddToFavorite).toHaveProperty("disabled", true);
  });
  it("Render ButtonClose", async () => {
    render(<ButtonClose />);
    const buttonClose = await screen.findByText(/Close/i);
    expect(buttonClose).toBeInTheDocument();
  });
});
