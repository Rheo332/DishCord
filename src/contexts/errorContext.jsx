import { createContext, useContext, useState } from "react";
import Snackbar from "../components/Snackbar/Snackbar.jsx";

const ErrorContext = createContext();

export function useError() {
  return useContext(ErrorContext);
}

export function ErrorContextProvider({ children }) {
  const [cerror, setError] = useState(null);

  return (
    <ErrorContext.Provider value={{ cerror, setError }}>
      {children}
      <Snackbar
        message={cerror?.message || ""}
        actionType={cerror?.actionType || ""}
        open={cerror?.message}
        onClose={() => setError(null)}
      />
    </ErrorContext.Provider>
  );
}
