import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes";

function App() {
  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            background: "transparent",
            boxShadow: "none",
            padding: 0,
          },
        }}
      />{" "}
      <AppRoutes />
    </>
  );
}

export default App;
