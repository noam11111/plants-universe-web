import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { UserContextProvider } from "./context/UserContext.tsx";
import { PostsContextProvider } from "./context/PostsContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserContextProvider>
      <PostsContextProvider>
        <App />
      </PostsContextProvider>
    </UserContextProvider>
  </StrictMode>
);
