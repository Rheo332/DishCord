import { useEffect } from "react";
import "./Snackbar.css";

function Snackbar({ message, actionType, open, onClose }) {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  return (
    <div className={`snackbar ${open ? "open" : ""}`}>
      <span>{message}</span>
      {actionType === "networkError" && (
        <button className="snackbar-action" onClick={() => window.location.reload()}>
          Retry
        </button>
      )}
      {actionType === "authError" && (
        <span className="snackbar-action">
          <button onClick={() => (window.location.href = "/login")}>Login</button>
        </span>
      )}
      {actionType === "internalServerError" && (
        <span className="snackbar-action">
          <button onClick={() => window.location.reload()}>Retry</button>
        </span>
      )}
    </div>
  );
}

export default Snackbar;
