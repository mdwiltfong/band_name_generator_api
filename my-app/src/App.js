import "./App.css";
import BandName from "./components/band_name/BandName";
import BandList from "./components/band_list/BandList";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <BandName />
        <BandList />
      </header>
    </div>
  );
};

export default App;
