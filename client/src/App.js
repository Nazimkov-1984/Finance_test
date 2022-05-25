import "./App.css";
import io from "socket.io-client";
import Header from "./components/header/Header";
import ListItem from "./components/listItem/ListItem";

const ENDPOINT = "http://localhost:4000/";

function App() {
  const socket = io(ENDPOINT);
  socket.emit("start");
  socket.on("ticker", (response) => {
    const res = Array.isArray(response) ? response : [response];
    const json = res.map((item) => JSON.stringify(item)).join("\n");
    console.log(json);
  });

  return (
    <div className="App">
      <Header />
      <ListItem />
    </div>
  );
}

export default App;
