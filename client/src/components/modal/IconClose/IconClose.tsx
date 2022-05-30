import { useCallback } from "react";
import ModalStore from "../../../store/modal";
import ModalFavoriteStore from "../../../store/favoriteModal";
import "./IconClose.css";
export interface CloseModalComponentsProps {
  isInFavoriteModal?: boolean;
}

const IconClose: React.FC<CloseModalComponentsProps> = ({
  isInFavoriteModal,
}) => {
  const onCloseModal = useCallback(() => {
    isInFavoriteModal
      ? ModalFavoriteStore.toggleModal()
      : ModalStore.toggleModal();
  }, [isInFavoriteModal]);

  return (
    <svg
      onClick={onCloseModal}
      fill="#000000"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="16px"
      height="16px"
      className="iconClose"
      data-testid="iconClose"
    >
      <path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z" />
    </svg>
  );
};

export default IconClose;
