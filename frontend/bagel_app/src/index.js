import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';


import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

window.onload = () => {
  window.scrollTo(0, 0);
}

const backendAddress = process.env.REACT_APP_BACKEND_URL;


const timer = setInterval(() => {
  let currDate = new Date();
  let daysUntilMonday = 1 + (7 - currDate.getDay()) % 7; // (3 + (7 - currDate.getDay() ) ) % 7;
  let nextMonday = new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate() + daysUntilMonday);
  let timeUntilMonday = nextMonday - currDate; // gives time in milliseconds



  let daysUntilTuesday = (2 + (7 - currDate.getDay())) % 7;
  let nextTuesday = new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate() + daysUntilTuesday);
  let timeUntilTuesday = nextTuesday - currDate; // gives time in milliseconds


  if (timeUntilTuesday <= 1200 && timeUntilTuesday >= 0) {
    // console.log("in here: ", timeUntilMonday);

    fetch(`${backendAddress}/send-orders`, {
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
        console.log("We errored: ", error);
      })
  }



  if (timeUntilMonday <= 1200 && timeUntilMonday >= 0) {
    // console.log("in here: ", timeUntilMonday);

    fetch(`${backendAddress}/send-orders`, {
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
        console.log("We errored: ", error);
      })
  }

}, 1000);
console.log(timer);






  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </React.StrictMode>
  );










// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
