const API_URL = import.meta.env.VITE_API_URL;

export async function checkServiceStatus(setServerStatus, setDatabaseStatus) {
  try {
    const res = await fetch(`${API_URL}/service-status`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      setServerStatus("Online");
      setDatabaseStatus("Online");
    }
    if (res.status === 500) {
      setServerStatus("Online");
      setDatabaseStatus("Offline");
    }
  } catch (error) {
    console.error("Error: ", error);
    setServerStatus("Offline");
    setDatabaseStatus("Offline");
  }
}
