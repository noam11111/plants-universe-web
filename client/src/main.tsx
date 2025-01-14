import "./index.css";
import App from "./App.tsx";
import { StrictMode } from "react";
import { SnackbarProvider } from "notistack";
import { createRoot } from "react-dom/client";
import { UserContextProvider } from "./context/UserContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserContextProvider>
      <SnackbarProvider />
      <App />
    </UserContextProvider>
  </StrictMode>
);
