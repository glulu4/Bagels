import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';


import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

window.onload = () => {
  window.scrollTo(0, 0);
}




console.log("index.ks from", window.location);
const timer = setInterval(() => {
  let currDate = new Date();
  let daysUntilMonday = 1 + ((7 - currDate.getDay()) % 7);
  let nextMonday = new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate() + daysUntilMonday);
  let timeUntilMonday = nextMonday - currDate; // gives time in milliseconds



  // let currDateT = new Date();
  // let daysUntilTuesday = (2 + (7 - currDate.getDay())) % 7;
  // let nextTuesday = new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate() + daysUntilTuesday);
  // let timeUntilTuesday = nextTuesday - currDate; // gives time in milliseconds



  // timeUntilTuesday -= 39600000

  

  // console.log(timeUntilTuesday);

  if (timeUntilMonday <= 1001 && timeUntilMonday > 0 ) {
    console.log("in here: ", timeUntilMonday);
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
        console.log(error);
      })
  }

}, 1000);
console.log(timer);



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
