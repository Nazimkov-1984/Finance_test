import { observable, computed, makeAutoObservable, action } from "mobx";

export interface QuoteData {
  ticker: string;
  exchange: string;
  price: number;
  change: number;
  change_percent: number;
  dividend: number;
  yield: number;
  last_trade_time: string;
}

class Store {
  _dataQuote: Array<QuoteData> = [];

  constructor() {
    makeAutoObservable(this, {
      dataQuote: computed,
      _dataQuote: observable,
      setData: action,
    });
  }

  setData = (data: QuoteData[]) => {
    this._dataQuote = data;
  };

  get dataQuote() {
    return this._dataQuote;
  }
}

export default new Store();
