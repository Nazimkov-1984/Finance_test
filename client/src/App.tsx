import { useEffect } from "react";
import Header from "./components/header/Header";
import TableQuotes from "./components/tableQuotes/TableQuotes";
import getSocketData from "./services/socketConnect";

function App() {
  useEffect(() => {
    getSocketData();
    return () => {
      console.log("sdfsdf");
      getSocketData(true);
    };
  }, []);

  return (
    <div>
      <Header />
      <TableQuotes />
    </div>
  );
}

export default App;
