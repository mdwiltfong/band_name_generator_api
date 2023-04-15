import { Outlet } from "react-router";
import NavBar from "./sign_up/NavBar";
export default function Root(params) {
  return (
    <>
      <NavBar />
      <div className="App-header">
        <Outlet />
      </div>
    </>
  );
}
