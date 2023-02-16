import "./App.css";
import BandName from "./components/band_name/BandName";
import BandList from "./components/band_list/BandList";
import NavBar from "./components/sign_up/NavBar";
import { Route, Routes } from "react-router";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <BandName />
                <BandList />
              </>
            }
          />
        </Routes>
        <BandName />
        <BandList />
      </header>
    </div>
  );
};

export default App;
