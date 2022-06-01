import { AgGridColumnProps, AgGridReact } from "ag-grid-react";
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
import classNames from "classnames";
import IconArrow, {
  ENUM_ARROW_COLOR,
} from "../tableQuotes/iconArrow/IconArrow";
import { keysQuotes, LIST_QUOTES } from "../tableQuotes/TableQuotes";
import { observer } from "mobx-react-lite";
import "./FavoriteModal.css";
import IconClose from "../modal/IconClose/IconClose";
import ButtonClose from "../modal/buttonClose/ButtonClose";
import getFilteredRowData from "../../hooks/useRowData";

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

  const columnDefs: AgGridColumnProps[] = [
    {
      field: "ticker",
      maxWidth: 90,
      cellRenderer: (props: { value: string }) => {
        return (
          <div className="tiker">
            <span className="tikerValue">{props.value}</span>
          </div>
        );
      },
      tooltipField: "ticker",
    },
    {
      field: "ticker",
      headerName: "Name",
      maxWidth: 100,
      cellRenderer: (props: { value: keysQuotes }) => {
        return <span>{LIST_QUOTES[props.value]}</span>;
      },
      tooltipField: "ticker",
    },
    { field: "exchange", maxWidth: 100, tooltipField: "exchange" },
    {
      field: "price",
      maxWidth: 85,
      cellRenderer: (props: { value: number }) => {
        return <span>{` $${props.value}`}</span>;
      },
      tooltipField: "price",
    },
    {
      field: "change",
      maxWidth: 85,
      cellRenderer: (props: { value: number }) => {
        return (
          <span
            className={classNames(
              { decrease: props.value < 0 },
              { increase: props.value > 0 },
              { normal: props.value === 0 }
            )}
          >
            {props.value}
          </span>
        );
      },
      tooltipField: "change",
    },
    {
      field: "change_percent",
      headerName: "%",
      maxWidth: 100,
      cellRenderer: (props: { value: number }) => {
        const color =
          props.value > 0
            ? ENUM_ARROW_COLOR.GREEN
            : props.value === 0
            ? ENUM_ARROW_COLOR.BLACK
            : ENUM_ARROW_COLOR.RED;
        return (
          <>
            <IconArrow color={color} />
            <span
              className={classNames(
                { decrease: props.value < 0 },
                { increase: props.value > 0 },
                { normal: props.value === 0 }
              )}
            >
              {props.value}
            </span>
          </>
        );
      },
      tooltipField: "change_percent",
    },
  ];

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
              columnDefs={columnDefs}
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
