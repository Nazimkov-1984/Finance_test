import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./ListItem.css";
import { AgGridColumnProps, AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import classNames from "classnames";
import IconArrow, { ENUM_ARROW_COLOR } from "./iconArrow/IconArrow";
import IconFilter from "./iconFilter/IconFilter";
import Multiselect from "multiselect-react-dropdown";
import { RowClickedEvent } from "ag-grid-community";
import ModalStore from "../../store/modal";
import Store from "../../store/index";
import { QuoteData } from "../../store";
import Tooltip from "./Tooltip/Tooltip";

export enum LIST_QUOTES {
  AAPL = "Apple",
  GOOGL = "Google",
  MSFT = "Microsoft",
  AMZN = "Amazon",
  FB = "Facebook",
  TSLA = "Tesla",
}

export type keysQuotes = "AAPL" | "GOOGL" | "MSFT" | "AMZN" | "FB" | "TSLA";

interface MultiSelectOptions {
  name: string;
  id: string;
}

const ListItem: React.FC = () => {
  const [rowData, setRowData] = useState<QuoteData[]>([]);

  useEffect(() => {
    setRowData(Store.dataQuote);
  }, []);

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

  const [options, setOptions] = useState<MultiSelectOptions[]>([]);

  const getSelectOptions = (data: QuoteData[]) => {
    const result: MultiSelectOptions[] = [];
    data.forEach((quote: QuoteData) => {
      result.push({
        name: LIST_QUOTES[quote.ticker as keysQuotes],
        id: quote.ticker,
      });
    });
    return result;
  };

  useMemo(() => {
    setOptions(getSelectOptions(rowData));
  }, [rowData]);

  const [selectedValue, setSelectedValue] = useState<MultiSelectOptions[]>([]);
  const [filterData, setFilterData] = useState<QuoteData[]>([]);

  const findAndSetFilteredElements = useCallback(
    (values: MultiSelectOptions[]) => {
      const newState: QuoteData[] = [];
      values.forEach((item: MultiSelectOptions) => {
        const newFilteredElement: QuoteData | undefined = rowData.find(
          (el: QuoteData) => el.ticker === item.id
        );
        if (newFilteredElement) {
          newState.push(newFilteredElement);
        }
      });
      setFilterData(newState);
    },
    [rowData]
  );

  const onSelectFilter = useCallback(
    (selectedItem: MultiSelectOptions[]) => {
      setSelectedValue(selectedItem);
      findAndSetFilteredElements(selectedItem);
    },
    [findAndSetFilteredElements]
  );

  const onRemoveFilter = useCallback(
    (removedItem: MultiSelectOptions[]) => {
      setSelectedValue(removedItem);
      if (removedItem.length > 0) {
        findAndSetFilteredElements(removedItem);
      } else {
        setFilterData([]);
      }
    },
    [findAndSetFilteredElements]
  );

  const openModalHandler = useCallback((event: RowClickedEvent) => {
    ModalStore.toggleModal(event.data.ticker);
  }, []);

  return (
    <div className="gridContainer">
      <div className="tableBar">
        <IconFilter isAvtive={selectedValue.length !== 0} />
        <Multiselect
          className="select"
          options={options}
          selectedValues={selectedValue}
          onSelect={onSelectFilter}
          onRemove={onRemoveFilter}
          displayValue="name"
          placeholder="Select quote..."
          hidePlaceholder={true}
          showArrow={true}
          showCheckbox={true}
        />
      </div>
      <div className="ag-theme-alpine gridWrapper">
        <AgGridReact
          rowClass="styleRow"
          rowData={filterData.length > 0 ? filterData : rowData}
          columnDefs={columnDefs}
          onRowClicked={openModalHandler}
          tooltipShowDelay={0}
          tooltipHideDelay={1000}
          defaultColDef={defaultColDef}
        ></AgGridReact>
      </div>
    </div>
  );
};
export default ListItem;
