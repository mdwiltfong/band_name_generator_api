import "./App.css";
import BandName from "./components/band_name/BandName";
import BandList from "./components/band_list/BandList";
import NavBar from "./components/sign_up/NavBar";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <div className="App">
        <header className="App-header">
          <NavBar />
          <BandName />
          <BandList />
        </header>
      </div>
      <div id="user_sign_up">
        <Outlet />
      </div>
    </>
  );
};

export default App;
