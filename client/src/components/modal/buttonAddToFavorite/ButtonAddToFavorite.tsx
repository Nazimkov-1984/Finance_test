import { useCallback, useState } from "react";
import ModalFavoriteStore from "../../../store/favoriteModal";
import "../Modal.css";

interface ButtonAddToFavoriteProps {
  itemId: string;
}
const ButtonAddToFavorite: React.FC<ButtonAddToFavoriteProps> = ({
  itemId,
}) => {
  const [isDisable, setIsDisable] = useState<boolean>(
    ModalFavoriteStore.favoriteData.includes(itemId)
  );
  const onClickHandler = useCallback(() => {
    setIsDisable(true);
    ModalFavoriteStore.setFavoriteDAta(itemId);
  }, [itemId]);

  return (
    <button
      onClick={onClickHandler}
      className="buttonModal buttonAdd"
      disabled={isDisable}
    >
      Add to favorite
    </button>
  );
};

export default ButtonAddToFavorite;
