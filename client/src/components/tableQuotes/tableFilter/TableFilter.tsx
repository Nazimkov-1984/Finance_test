import Multiselect from "multiselect-react-dropdown";
import { useCallback, useEffect, useState } from "react";
import { QuoteData } from "../../../store";
import IconFilter from "../iconFilter/IconFilter";
import { keysQuotes, LIST_QUOTES, MultiSelectOptions } from "../TableQuotes";
import Store from "../../../store/index";
import "./TableFilter.css";
import getFilteredRowData from "../../../hooks/useRowData";

interface TableFilterProps {
  selectedFilters: MultiSelectOptions[];
  setSelectedFilters: (selectedItem: MultiSelectOptions[]) => void;
  setRowData: (data: QuoteData[]) => void;
  rowData: QuoteData[];
}

const TableFilter: React.FC<TableFilterProps> = ({
  selectedFilters,
  setSelectedFilters,
  setRowData,
  rowData,
}) => {
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

  useEffect(() => {
    setOptions(getSelectOptions(Store.dataQuote));
    // eslint-disable-next-line
  }, [Store.dataQuote]);

  const onSelectFilter = useCallback(
    (selectedItem: MultiSelectOptions[]) => {
      setSelectedFilters(selectedItem);
      setRowData(getFilteredRowData(selectedItem));
    },
    [setSelectedFilters, setRowData]
  );

  const onRemoveFilter = useCallback(
    (removedItem: MultiSelectOptions[]) => {
      setSelectedFilters(removedItem);
      setRowData(getFilteredRowData(removedItem));
    },
    [setSelectedFilters, setRowData]
  );
  return (
    <div className="tableBar" data-testid="TableFilter">
      <IconFilter isAvtive={selectedFilters?.length !== 0} />
      <Multiselect
        className="select"
        options={options}
        selectedValues={selectedFilters}
        onSelect={onSelectFilter}
        onRemove={onRemoveFilter}
        displayValue="name"
        placeholder="Select quote..."
        hidePlaceholder={true}
        showArrow={true}
        showCheckbox={true}
        disable={rowData?.length === 0}
      />
    </div>
  );
};

export default TableFilter;
