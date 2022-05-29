import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from "./App";
import Modal from "./components/modal/Modal.tsx";
import ModalFavorite from "./components/favoriteModal/FavoriteModal";

ReactDOM.render(
  <React.StrictMode>
    <App />
    {ReactDOM.createPortal(<Modal />, document.getElementById("modal"))}
    {ReactDOM.createPortal(<ModalFavorite />, document.getElementById("modal"))}
  </React.StrictMode>,
  document.getElementById("root")
);

