import classNames from "classnames";
import IconArrow, {
  ENUM_ARROW_COLOR,
} from "../components/tableQuotes/iconArrow/IconArrow";
import { keysQuotes, LIST_QUOTES } from "../components/tableQuotes/TableQuotes";
import { AgGridColumnProps } from "ag-grid-react";

const useColumnDefs = () => {
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
  return columnDefs;
};

export default useColumnDefs;
