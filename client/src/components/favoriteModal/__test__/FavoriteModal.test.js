import { render, screen } from "@testing-library/react";
import FavoriteModal from "../FavoriteModal";
import ModalFavoriteStore from "../../../store/favoriteModal";

describe("FavoriteModal tests", () => {
  it("Render FavoriteTEst modal", async () => {
    ModalFavoriteStore.toggleModal();
    render(<FavoriteModal />);
    const modal = await screen.findByTestId(/modalFavorite/i);
    expect(modal).toBeInTheDocument();
  });
});
