import { observable, makeAutoObservable, action, computed } from "mobx";

class ModalFavoriteStore {
  public _isOpenFavoriteModal: boolean = false;
  public _favoriteData: Array<string> = [];

  constructor() {
    makeAutoObservable(this, {
      _isOpenFavoriteModal: observable,
      _favoriteData: observable,
      toggleModal: action,
      isOpenModal: computed,
      favoriteData: computed
    });
  }

   get isOpenModal() {
    return this._isOpenFavoriteModal;
  }
  get favoriteData() {
      return this._favoriteData;
  }

  toggleModal = () => {
    this._isOpenFavoriteModal = !this._isOpenFavoriteModal;
  };

  setFavoriteDAta = (data:string) => {
      this._favoriteData.push(data)
  }
}

export default new ModalFavoriteStore();