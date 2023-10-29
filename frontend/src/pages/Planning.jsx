import NavigationBar from "../Components/NavigationBar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useState } from "react";
import { Link } from "react-router-dom";

function Planning() {
  const [destination, setDestination] = useState("");
  const [numberOfDays, setNumberOfDays] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
  };

  const handleNumberOfDaysChange = (e) => {
    setNumberOfDays(e.target.value);
  };

  const handleSubmit = async (e) => {
    const data = {
      destination: destination,
      numberOfDays: numberOfDays,
    };

    console.log("clicked");
    console.log(data);

    // Make a POST request to your backend API
    const requstOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    fetch("http://localhost:9000/itinerary", requstOptions)
      .then((response) => response.json())
      .then((data) => console.log("kfjdsklf",data));
  };
  // fetch("http://localhost:9000/itinerary", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(data),
  // })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log("Success:", data.message);
  //     // setResponseMessage(data.message);
  //   })
  //   .catch((error) => {
  //     console.error("Error:", error);
  //   });

  return (
    <>
      <NavigationBar />
      <Container className="justify-content-center w-50">
        <Form>
          <Form.Label className="mt-3">Where would you like to go?</Form.Label>
          <Form.Control
            placeholder="Destination"
            onChange={handleDestinationChange}
          />
          <Form.Label className="mt-3">
            How many days will you be there?
          </Form.Label>
          <Form.Control
            placeholder="Number of days"
            type="number"
            onChange={handleNumberOfDaysChange}
          />
          <Link to="/results">
            <Button className="mt-3" onClick={handleSubmit}>
              Submit form
            </Button>
          </Link>
        </Form>
      </Container>
    </>
  );
}

export default Planning;
