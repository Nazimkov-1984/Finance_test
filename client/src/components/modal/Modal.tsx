import React, { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import ModalStore from "../../store/modal";
import Store from "../../store/index";
import "./Modal.css";
import IconClose from "./IconClose/IconClose";
import { QuoteData } from "../../store";
import { keysQuotes, LIST_QUOTES } from "../tableQuotes/TableQuotes";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/airbnb.css";
import ButtonAddToFavorite from "./buttonAddToFavorite/ButtonAddToFavorite";

const Modal = observer(() => {
  const [quoteData, setQuoteData] = useState<QuoteData>();
  useEffect(() => {
    const id = ModalStore.idQuote;
    if (id) {
      const data = Store.dataQuote.find((el: QuoteData) => el.ticker === id);
      setQuoteData(data);
    }
    // eslint-disable-next-line
  }, [ModalStore._idQoute]);

  const onOutsideClick = useCallback((e: SyntheticEvent) => {
    const modal = document.querySelector(".modal");
    if (e.target === modal) {
      ModalStore.toggleModal();
    }
  }, []);

  const onCloseModal = useCallback(() => {
    ModalStore.toggleModal();
  }, []);

  if (ModalStore.isOpenModal) {
    return (
      <div className="modal" onClick={onOutsideClick}>
        <div className="modalBody">
          <div className="modalHeader">
            <div className="modalTitleWrapper">
              <div className="modalIcon">{quoteData?.ticker}</div>
              <span className="modalTitle">
                {LIST_QUOTES[quoteData?.ticker as keysQuotes]}
              </span>
            </div>
            <IconClose />
          </div>

          <div className="modalDataWrapper">
            <div className="calendarWrapper">
              <span className="dateTitle"> Last update time: </span>
              <Flatpickr
                className="calendarModal"
                data-enable-time
                value={quoteData?.last_trade_time}
              />
            </div>
            <span className="modalDataValue">{`Price: $${quoteData?.price}`}</span>
            <span className="modalDataValue">{`Change: ${quoteData?.change}`}</span>
            <span className="modalDataValue">{`Change, % : ${quoteData?.change_percent}`}</span>
            <span className="modalDataValue">{`Dividend: ${quoteData?.dividend}`}</span>
            <span className="modalDataValue">{`Yield: ${quoteData?.yield}`}</span>
          </div>
          <div className="buttonsWrapper">
            <ButtonAddToFavorite itemId={ModalStore.idQuote as string} />
            <button onClick={onCloseModal} className="buttonModal">
              Close
            </button>
          </div>
        </div>
      </div>
    );
  } else return null;
});
export default Modal;
