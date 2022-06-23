import NicknameSearch from "./components/NicknameSearch";
import ResponsiveAppBar from "./components/ResponsiveAppBar";

function App() {
  return (
    <div>
      <div className="header">
        <ResponsiveAppBar />
      </div>
      <div className="body" style={{ background: "#4884B51" }}>
        <NicknameSearch />
      </div>
      <div className="footer"></div>
    </div>
  );
}

export default App;
