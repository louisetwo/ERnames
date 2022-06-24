import { Box } from "@mui/system";
import FormDialog from "./components/FormDialog";
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
        //bgcolor="#484B51" ou AliceBlue
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "calc(100vh - 64px)",
        }}
      >
        <div className="body">
          <NicknameSearch />
          <FormDialog />
        </div>
      </Box>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
