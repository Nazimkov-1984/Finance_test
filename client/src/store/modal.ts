import { observable, makeAutoObservable, action, computed } from "mobx";

class ModalStore {
  public _isOpenModal: boolean = false;
  public _idQoute: string | undefined = "";

  constructor() {
    makeAutoObservable(this, {
      _isOpenModal: observable,
      _idQoute: observable,
      toggleModal: action,
      isOpenModal: computed,
      idQuote: computed,
    });
  }

  get idQuote() {
    return this._idQoute;
  }
  get isOpenModal() {
    return this._isOpenModal;
  }

  toggleModal = (id?: string) => {
    this._isOpenModal = !this._isOpenModal;
    this._idQoute = id;
  };
}

export default new ModalStore();
