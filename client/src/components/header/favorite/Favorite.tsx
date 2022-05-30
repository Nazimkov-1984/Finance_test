import classNames from "classnames";
import "./Favorite.css";
import ModalFavoriteStore from "../../../store/favoriteModal";
import { observer } from "mobx-react-lite";
import { useCallback } from "react";

const Favorite: React.FC = observer(() => {
  const onClickHandler = useCallback(() => {
    ModalFavoriteStore.toggleModal();
  }, []);

  return (
    <button
      onClick={onClickHandler}
      disabled={ModalFavoriteStore.favoriteData?.length === 0}
      className={classNames("favorite", {
        disabled: ModalFavoriteStore.favoriteData?.length === 0,
      })}
    >
      Favorite quotes
    </button>
  );
});

export default Favorite;
