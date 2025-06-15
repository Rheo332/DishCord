import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { registerSW } from "virtual:pwa-register";
import App from "./App.jsx";
import { AuthCheck } from "./contexts/authContext.jsx";
import { ErrorContextProvider } from "./contexts/errorContext.jsx";
import { UserDataProvider } from "./contexts/userDataContext.jsx";

registerSW();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthCheck>
        <UserDataProvider>
          <ErrorContextProvider>
            <App />
          </ErrorContextProvider>
        </UserDataProvider>
      </AuthCheck>
    </BrowserRouter>
  </StrictMode>
);
