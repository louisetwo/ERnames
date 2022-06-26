import { Alert } from "@mui/material";
import { Box } from "@mui/system";
import CreateMonitorDialog from "../CreateMonitorDialog";

const mapStatus = {
  available: "success",
  unavailable: "info",
  unsure: "warning",
};

const NicknameResult = ({ result }) => {
  if (result !== null) {
    return (
      <Box>
        <Alert variant="filled" severity={mapStatus[result.status]}>
          {result.message}
        </Alert>
        {result.status === "unavailable" ? (
          <CreateMonitorDialog
            nickname={result.nickname}
            date={result.expirationDate}
          />
        ) : null}
      </Box>
    );
  }
  return null;
};

export default NicknameResult;
