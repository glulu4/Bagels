import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';


import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { loadStripe } from "@stripe/stripe-js";


console.log("index.ks from", window.location);
const timer = setInterval(() => {
  let currDate = new Date();
  let daysUntilMonday = 1 + ((7 - currDate.getDay()) % 7);
  let nextMonday = new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate() + daysUntilMonday);
  let timeUntilMonday = nextMonday - currDate; // gives time in milliseconds

  // let days = Math.floor(timeUntilMonday / (1000 * 60 * 60 * 24));
  // let hours = Math.floor((timeUntilMonday % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  // let minutes = Math.floor((timeUntilMonday % (1000 * 60 * 60)) / (1000 * 60));
  // let seconds = Math.floor((timeUntilMonday % (1000 * 60)) / 1000);






  if (timeUntilMonday <= 0) {

    fetch("https://bagel-app-11c1ad484767.herokuapp.com/send-orders", {
      method: "post",
      headers: { "Content-Type": "application/json; charset=UTF-8" }, //"Content-Type: application/json"
      body: JSON.stringify({}),
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
        else {
          throw new Error("Error: " + response.status);
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      })
  }

}, 1000);



  // can be an instance of stripe or a promise that resolves into a instance of .. 
  // const stripePromise = loadStripe( publishableKey ) // dont call in render
  

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        {/* <Elements stripe={stripePromise} options={options}> */}
          {/* <ApplePayButton onClick={() => handleApplePayClick()} /> */}
          <App />
        {/* </Elements> */}
      </BrowserRouter>
    </React.StrictMode>
  );


// })() // end of async thing







// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
