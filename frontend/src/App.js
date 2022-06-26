import { Box } from "@mui/system";
import Footer from "./components/Layout/Footer";
import NicknameSearch from "./components/NicknameSearch";
import ResponsiveAppBar from "./components/ResponsiveAppBar";

function App() {
  return (
    <div>
      <div className="header">
        <ResponsiveAppBar />
      </div>
      <Box
        bgcolor="WhiteSmoke"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "calc(100vh - 64px - 258.5px)",
        }}
      >
        <div className="body">
          <NicknameSearch />
        </div>
      </Box>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
