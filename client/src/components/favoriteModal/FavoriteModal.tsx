import { AgGridColumnProps, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import ModalFavoriteStore from "../../store/favoriteModal";
import { QuoteData } from "../../store";
import classNames from "classnames";
import IconArrow, {
  ENUM_ARROW_COLOR,
} from "../tableQuotes/iconArrow/IconArrow";
import { keysQuotes, LIST_QUOTES } from "../tableQuotes/TableQuotes";
import { observer } from "mobx-react-lite";
import "./FavoriteModal.css";
import Store from "../../store/index";

const ModalFavorite = observer(() => {
  const [rowData, setRowData] = useState<QuoteData[]>([]);

  const applyFilter = useCallback((filter: string[]) => {
    const filteredData: QuoteData[] = [];
    filter.forEach((item: string) => {
      const newElement: QuoteData | undefined = Store.dataQuote.find(
        (it: QuoteData) => it.ticker === item
      );
      if (newElement) {
        filteredData.push(newElement);
      }
    });
    setRowData(filteredData);
  }, []);

  useEffect(() => {
    applyFilter(ModalFavoriteStore.favoriteData);
    // eslint-disable-next-line
  }, [ModalFavoriteStore.isOpenModal]);

  const onOutsideClick = useCallback((e: SyntheticEvent) => {
    const modal = document.querySelector(".modalFavorite");
    if (e.target === modal) {
      ModalFavoriteStore.toggleModal();
    }
  }, []);

  const [columnDefs] = useState<AgGridColumnProps[]>([
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
  ]);

  if (ModalFavoriteStore.isOpenModal) {
    return (
      <div className="modalFavorite" onClick={onOutsideClick}>
        <div className="modalFavoriteBody">
          <div className="modalFavoriteHeader">
            <span>Favorite quotes</span>
          </div>
          <div className="ag-theme-alpine gridWrapper">
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              animateRows={true}
            ></AgGridReact>
          </div>
        </div>
      </div>
    );
  } else return null;
});
export default ModalFavorite;
