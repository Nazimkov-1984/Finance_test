 import Store  from "../store/index";
 import io from "socket.io-client";
 
const ENDPOINT = "http://localhost:4000/";

 const getSocketData  = () => {
 const socket = io(ENDPOINT);
  socket.emit("start");
  socket.on("ticker", (response) => {
    const res = Array.isArray(response) ? response : [response];
    Store.setData(res);
  });
}

export default getSocketData;