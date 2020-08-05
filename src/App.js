import React from "react";
import Axios from "axios";
import { Button } from "@material-ui/core";
import "./App.css";

const paymentHandler = async (e) => {
  e.preventDefault();
  const API_URL = process.env.REACT_APP_API_URL;
  const orderUrl = `${API_URL}order`;
  const response = await Axios.get(orderUrl);
  const { data } = response;

  const options = {
    // key: process.env.RAZOR_PAY_TEST_KEY,
    name: "my simple app",
    description: "payment test",
    order_id: data.id,
    handler: async (response) => {
      try {
        const paymentId = response.razorpay_payment_id;
        const url = `${API_URL}capture/${paymentId}`;
        const captureResponse = await Axios.post(url, {});
        console.log(captureResponse.data);
      } catch (err) {
        console.log(err);
      }
    },
    theme: {
      color: "#686CFD"
    }
  };

  const rzp1 = new window.Razorpay(options);
  rzp1.open();
};

function App() {
  return (
    <div className="App">
      <Button
        variant="contained"
        color="primary"
        onClick={paymentHandler}
      >
        Pay Now!
      </Button>
    </div>
  );
}

export default App;
