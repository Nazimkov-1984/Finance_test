import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import ModalFavoriteStore from "../../store/favoriteModal";
import { QuoteData } from "../../store";

import { observer } from "mobx-react-lite";
import "./FavoriteModal.css";
import IconClose from "../modal/IconClose/IconClose";
import ButtonClose from "../modal/buttonClose/ButtonClose";
import getFilteredRowData from "../../hooks/useRowData";
import useColumnDefs from "../../hooks/useColumnDefs ";

const ModalFavorite: React.FC = observer(() => {
  const [rowData, setRowData] = useState<QuoteData[]>([]);
  const modalRef = useRef(null);

  useEffect(() => {
    setRowData(getFilteredRowData(undefined, ModalFavoriteStore.favoriteData));
    // eslint-disable-next-line
  }, [ModalFavoriteStore.isOpenModal]);

  const onOutsideClick = useCallback((e: SyntheticEvent) => {
    if (e.target === modalRef.current) {
      ModalFavoriteStore.toggleModal();
    }
  }, []);

  if (ModalFavoriteStore.isOpenModal) {
    return (
      <div
        data-testid="modalFavorite"
        className="modalFavorite"
        onClick={onOutsideClick}
        ref={modalRef}
      >
        <div className="modalFavoriteBody">
          <div className="modalFavoriteHeader">
            <span className="modalFavoriteTitle">Favorite quotes</span>
            <IconClose isInFavoriteModal={true} />
          </div>
          <div className="ag-theme-alpine gridWrapper">
            <AgGridReact
              rowData={rowData}
              columnDefs={useColumnDefs()}
              animateRows={true}
            ></AgGridReact>
          </div>
          <ButtonClose isInFavoriteModal={true} />
        </div>
      </div>
    );
  } else return null;
});
export default ModalFavorite;
