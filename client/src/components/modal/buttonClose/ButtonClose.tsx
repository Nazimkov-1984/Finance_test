import { useCallback } from "react";
import ModalStore from "../../../store/modal";
import ModalFavoriteStore from "../../../store/favoriteModal";
import { CloseModalComponentsProps } from "../IconClose/IconClose";
import "./ButtonClose.css";

const ButtonClose: React.FC<CloseModalComponentsProps> = ({
  isInFavoriteModal,
}) => {
  const onCloseModal = useCallback(() => {
    isInFavoriteModal
      ? ModalFavoriteStore.toggleModal()
      : ModalStore.toggleModal();
  }, [isInFavoriteModal]);

  return (
    <button onClick={onCloseModal} className="buttonModal">
      Close
    </button>
  );
};
export default ButtonClose;
