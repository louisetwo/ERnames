import NicknameSearch from "./components/NicknameSearch";
import ResponsiveAppBar from "./components/ResponsiveAppBar";

function App() {
  return (
    <div>
      <div className="header">
        <ResponsiveAppBar />
      </div>
      <div className="body">
        <NicknameSearch />
      </div>
    </div>
  );
}

export default App;
