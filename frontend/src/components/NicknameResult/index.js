import { Alert } from "@mui/material";

const mapStatus = {
  available: "success",
  unavailable: "info",
  unsure: "warning",
};

const NicknameResult = ({ result }) => {
  if (result !== null) {
    return <Alert severity={mapStatus[result.status]}>{result.message}</Alert>;
  }
  return null;
};

export default NicknameResult;
