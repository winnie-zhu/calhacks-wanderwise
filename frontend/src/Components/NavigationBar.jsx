import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import logo from "../assets/planes.png";
import "./NavigationBar.css";
import { GoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google";

function NavigationBar() {
  return (
    <>
      <Navbar expand="lg" data-bs-theme="light">
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="imwdb logo" /> WanderWise
        </Link>
        {/* <Link to="/planning" className="nav-link">
          Plan Trip
        </Link> */}
        {/* <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        /> */}
        
      </Navbar>
    </>
  );
}

export default NavigationBar;
