import { Link } from "react-router-dom";
import "../App.css";
import NavigationBar from "../Components/NavigationBar";

function Home() {
  return (
    <>
      <NavigationBar />
      <div className="home-content">
        <div className="home-content-item home-text">
          <h1>Optimize your itinerary creation with <b className="brand-name">WanderWise.</b></h1> 
          <h2>A smart and simple way to plan your next trip.</h2>
        </div>

        <Link to="/planning" className="home-content-item" style={{textDecoration: "none"}}>
          <button className="btn-hover">Start Planning</button>
        </Link>
      </div>
    </>
  );
}

export default Home;
