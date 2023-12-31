import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import logo from "../assets/planes.png";
import "./NavigationBar.css";
import Login from "../Components/Login";


function NavigationBar() {
  return (
    <>
      <Navbar expand="lg" data-bs-theme="light" className="justify-content-between px-3">
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="imwdb logo" /> WanderWise
        </Link>
        <Login />
      </Navbar>
    </>
  );
}

export default NavigationBar;
