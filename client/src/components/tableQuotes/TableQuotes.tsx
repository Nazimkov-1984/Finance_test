import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./TableQuotes.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { RowClickedEvent } from "ag-grid-community";
import ModalStore from "../../store/modal";
import Store from "../../store/index";
import { QuoteData } from "../../store";
import Tooltip from "./Tooltip/Tooltip";
import { observer } from "mobx-react-lite";
import Loader from "./loader/Loader";
import TableFilter from "./tableFilter/TableFilter";
import getFilteredRowData from "../../hooks/useRowData";
import useColumnDefs from "../../hooks/useColumnDefs ";

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

  useEffect(() => {
    if (selectedFilters.length === 0) {
      setRowData(Store.dataQuote);
    } else {
      setRowData(getFilteredRowData(selectedFilters));
    }
    // eslint-disable-next-line
  }, [Store.dataQuote]);

  const defaultColDef = useMemo(() => {
    return {
      tooltipComponent: Tooltip,
    };
  }, []);

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
        rowData={rowData}
      />
      <div className="ag-theme-alpine gridWrapper">
        <AgGridReact
          noRowsOverlayComponent={loadingOverlayComponent}
          rowClass="styleRow"
          rowData={rowData}
          columnDefs={useColumnDefs()}
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
