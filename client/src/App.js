import io from "socket.io-client";
import Header from "./components/header/Header";
import Store from "./store/index";
import TableQuotes from "./components/tableQoutes/TableQuotes";

const ENDPOINT = "http://localhost:4000/";

function App() {
  const socket = io(ENDPOINT);
  socket.emit("start");
  socket.on("ticker", (response) => {
    const res = Array.isArray(response) ? response : [response];
    Store.setData(res);
  });

  return (
    <div>
      <Header />
      <TableQuotes />
    </div>
  );
}

export default App;
