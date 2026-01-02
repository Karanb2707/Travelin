import { useEffect } from "react";
import { api } from "./mock/api";

function App() {
  useEffect(() => {
    api.get("/").then((res) => console.log(res.data.message));
  }, []);

  return (
    <div className="text-center text-xl font-bold">
      <h1>Hello Travelin</h1>
    </div>
  );
}

export default App;
