const API_URL = import.meta.env.VITE_API_URL;

export async function checkServiceStatus(setServerStatus, setError) {
  try {
    const res = await fetch(`${API_URL}/service-status`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      setServerStatus("Online");
    }
    if (res.status === 500) {
      setServerStatus("Online");
    } else {
      setServerStatus("Offline");
      setError({
        message: "Service currently unavailable.",
        actionType: "internalServerError",
        open: true,
      });
    }
  } catch (error) {
    console.error("Error: ", error);
    setServerStatus("Offline");
    setError({
      message: "Could not connect to Server.",
      actionType: "networkError",
      open: true,
    });
  }
}
