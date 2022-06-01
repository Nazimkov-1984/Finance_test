import { MultiSelectOptions } from "../components/tableQuotes/TableQuotes";
import { QuoteData } from "../store";
import Store from "../store/index";

const getFilteredRowData = (
  filter?: MultiSelectOptions[],
  filterFavorite?: string[]
) => {
  const filteredData: QuoteData[] = [];

  if (filterFavorite) {
    filterFavorite?.forEach((item: string) => {
      const newElement: QuoteData | undefined = Store.dataQuote.find(
        (it: QuoteData) => it.ticker === item
      );
      if (newElement) {
        filteredData.push(newElement);
      }
    });
  } else {
    filter?.forEach((item: MultiSelectOptions) => {
      const newElement: QuoteData | undefined = Store.dataQuote.find(
        (it: QuoteData) => it.ticker === item.id
      );
      if (newElement) {
        filteredData.push(newElement);
      }
    });
  }
  return filteredData;
};

export default getFilteredRowData;