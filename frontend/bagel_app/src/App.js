import './config-env.js'

import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import React from 'react';

import './App.css';

import Home from './Pages/Home/Home.js';
import Order from './Pages/Order/Order.js';
import PaymentPage from './Pages/Payment/PaymentPage.js';
import Success from "./Pages/Success/Success.js"
import ConfirmOrder from './Pages/ConfirmOrder/ConfirmOrder.js';

function App() {
  return (
    <>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </Helmet>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<Order />} />
        <Route path="/confirm-order" element={<ConfirmOrder />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </>
  );
}

export default App;
