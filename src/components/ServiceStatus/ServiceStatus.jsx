import { Server, ServerOff, Database, DatabaseZap } from "lucide-react";
import { useState, useEffect } from "react";
import "./ServiceStatus.css";
import { checkServiceStatus } from "../../services/StatusService";

function ServiceStatus() {
  const [serverStatus, setServerStatus] = useState("Offline");
  const [databaseStatus, setDatabaseStatus] = useState("Offline");

  useEffect(() => {
    checkServiceStatus(setServerStatus, setDatabaseStatus);
  }, []);

  return (
    <>
      <div className="service-status">
        <div className="server-status">
          {serverStatus === "Online" ? (
            <Server className="server-icon" />
          ) : (
            <ServerOff className="server-off-icon" />
          )}

          <p className="server-status-text">{serverStatus}</p>
        </div>
        <div className="database-status">
          {databaseStatus === "Online" ? (
            <Database className="database-icon" />
          ) : (
            <DatabaseZap className="database-off-icon" />
          )}
          <span className="database-status-text">{databaseStatus}</span>
        </div>
      </div>
    </>
  );
}

export default ServiceStatus;
