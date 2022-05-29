import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./TableQuotes.css";
import { AgGridColumnProps, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import classNames from "classnames";
import IconArrow, { ENUM_ARROW_COLOR } from "./iconArrow/IconArrow";
import { RowClickedEvent } from "ag-grid-community";
import ModalStore from "../../store/modal";
import Store from "../../store/index";
import { QuoteData } from "../../store";
import Tooltip from "./Tooltip/Tooltip";
import { observer } from "mobx-react-lite";
import Loader from "./loader/Loader";
import TableFilter from "./tableFilter/TableFilter";

export enum LIST_QUOTES {
  AAPL = "Apple",
  GOOGL = "Google",
  MSFT = "Microsoft",
  AMZN = "Amazon",
  FB = "Facebook",
  TSLA = "Tesla",
}

export type keysQuotes = "AAPL" | "GOOGL" | "MSFT" | "AMZN" | "FB" | "TSLA";

export interface MultiSelectOptions {
  name: string;
  id: string;
}

const TableQuotes: React.FC = observer(() => {
  const [rowData, setRowData] = useState<QuoteData[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<MultiSelectOptions[]>(
    []
  );

  const applyFilter = useCallback((filter: MultiSelectOptions[]) => {
    const filteredData: QuoteData[] = [];
    filter.forEach((item: MultiSelectOptions) => {
      const newElement: QuoteData | undefined = Store.dataQuote.find(
        (it: QuoteData) => it.ticker === item.id
      );
      if (newElement) {
        filteredData.push(newElement);
      }
    });
    setRowData(filteredData);
  }, []);

  useEffect(() => {
    if (selectedFilters.length === 0) {
      setRowData(Store.dataQuote);
    } else {
      applyFilter(selectedFilters);
    }
    // eslint-disable-next-line
  }, [Store.dataQuote]);

  const defaultColDef = useMemo(() => {
    return {
      tooltipComponent: Tooltip,
    };
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

  const openModalHandler = useCallback((event: RowClickedEvent) => {
    ModalStore.toggleModal(event.data.ticker);
  }, []);

  const loadingOverlayComponent = useMemo(() => {
    return Loader;
  }, []);

  return (
    <div className="gridContainer">
      <TableFilter
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        setRowData={setRowData}
        applyFilter={applyFilter}
        rowData={rowData}
      />
      <div className="ag-theme-alpine gridWrapper">
        <AgGridReact
          noRowsOverlayComponent={loadingOverlayComponent}
          rowClass="styleRow"
          rowData={rowData}
          columnDefs={columnDefs}
          onRowClicked={openModalHandler}
          tooltipShowDelay={0}
          tooltipHideDelay={1000}
          animateRows={true}
          defaultColDef={defaultColDef}
        ></AgGridReact>
      </div>
    </div>
  );
});
export default TableQuotes;
