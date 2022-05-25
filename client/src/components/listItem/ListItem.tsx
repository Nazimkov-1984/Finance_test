import React, { useCallback, useState } from "react";
import "./ListItem.css";
import { AgGridColumnProps, AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import classNames from "classnames";
import IconArrow, { ENUM_ARROW_COLOR } from "./iconArrow/IconArrow";
import IconFilter from "./iconFilter/IconFilter";
import Multiselect from "multiselect-react-dropdown";

enum LIST_QUOTES {
  AAPL = "Apple",
  GOOGL = "Google",
  MSFT = "Microsoft",
  AMZN = "Amazon",
  FB = "Facebook",
  TSLA = "Tesla",
}

type keysQuotes = "AAPL" | "GOOGL" | "MSFT" | "AMZN" | "FB" | "TSLA";

interface QuoteData {
  ticker: string;
  exchange: string;
  price: number;
  change: number;
  change_percent: number;
  dividend: number;
  yield: number;
  last_trade_time: string;
}

interface MultiSelectOptions {
  name: string;
  id: number;
}

const ListItem: React.FC = () => {
  const [rowData] = useState<QuoteData[]>([
    {
      ticker: "GOOGL",
      exchange: "NASDAQ",
      price: 237.08,
      change: 154.38,
      change_percent: 0.1,
      dividend: 0.46,
      yield: 1.18,
      last_trade_time: "2021-04-30T11:53:21.000Z",
    },
    {
      ticker: "MSFT",
      exchange: "NASDAQ",
      price: 261.46,
      change: -161.45,
      change_percent: -0.41,
      dividend: 0.18,
      yield: 0.98,
      last_trade_time: "2021-04-30T11:53:21.000Z",
    },
    {
      ticker: "AMZN",
      exchange: "NASDAQ",
      price: 260.34,
      change: 128.71,
      change_percent: 0.6,
      dividend: 0.07,
      yield: 0.42,
      last_trade_time: "2021-04-30T11:53:21.000Z",
    },
    {
      ticker: "FB",
      exchange: "NASDAQ",
      price: 266.77,
      change: 171.92,
      change_percent: 0.75,
      dividend: 0.52,
      yield: 1.31,
      last_trade_time: "2021-04-30T11:53:21.000Z",
    },
    {
      ticker: "TSLA",
      exchange: "NASDAQ",
      price: 272.13,
      change: 158.76,
      change_percent: 0.1,
      dividend: 0.96,
      yield: 1.0,
      last_trade_time: "2021-04-30T11:53:21.000Z",
    },
  ]);

  const [columnDefs] = useState<AgGridColumnProps[]>([
    {
      field: "ticker",
      maxWidth: 90,
      cellRendererFramework: (props: { value: string }) => {
        return (
          <div className="tiker">
            <span className="tikerValue">{props.value}</span>
          </div>
        );
      },
    },
    {
      field: "ticker",
      headerName: "Name",
      maxWidth: 100,
      cellRendererFramework: (props: { value: keysQuotes }) => {
        return <span>{LIST_QUOTES[props.value]}</span>;
      },
    },
    { field: "exchange", maxWidth: 100 },
    {
      field: "price",
      maxWidth: 85,
      cellRendererFramework: (props: { value: number }) => {
        return <span>{` $${props.value}`}</span>;
      },
    },
    {
      field: "change",
      maxWidth: 85,
      cellRendererFramework: (props: { value: number }) => {
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
    },
    {
      field: "change_percent",
      headerName: "%",
      maxWidth: 100,
      cellRendererFramework: (props: { value: number }) => {
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
    },
    { field: "dividend", maxWidth: 100 },
    { field: "yield", maxWidth: 80 },
  ]);

  const [options] = useState<MultiSelectOptions[]>([
    { name: "Option1", id: 1 },
    { name: "Option2", id: 2 },
  ]);

  const [selectedValue, setSelectedValue] = useState<MultiSelectOptions[]>([]);

  const onSelectFilter = useCallback((selectedItem: MultiSelectOptions[]) => {
    setSelectedValue(selectedItem);
  }, []);
  const onRemoveFilter = useCallback((removedItem: MultiSelectOptions[]) => {
    setSelectedValue(removedItem);
  }, []);

  return (
    <div className="gridContainer">
      <div className="tableBar">
        <IconFilter isAvtive={selectedValue.length !== 0} />
        <Multiselect
          options={options}
          selectedValues={selectedValue}
          onSelect={onSelectFilter}
          onRemove={onRemoveFilter}
          displayValue="name"
          placeholder="Choose quote..."
          hidePlaceholder={true}
          showArrow={true}
        />
      </div>
      <div className="ag-theme-alpine gridWrapper">
        <AgGridReact
          rowClass="styleRow"
          rowData={rowData}
          columnDefs={columnDefs}
        ></AgGridReact>
      </div>
    </div>
  );
};
export default ListItem;
