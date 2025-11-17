// src/ app.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Protected from "./components/Protected.jsx";
import SignIn from "./components/signIn.jsx";
import CustomerList from "./components/customerList.jsx";
import SalesList from "./components/salesList.jsx";
import SalesRegistration from "./components/salesRegistration.jsx";
import SalesReport from "./components/salesReport.jsx";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/customerlist" element={<CustomerList />} />
      <Route path="/saleslist" element={<SalesList />} />
      <Route path="/salesregistration" element={<SalesRegistration />} />
      <Route path="/salesreport" element={<SalesReport />} />
      <Route path="/protected" element={<Protected />} />
    </Routes>
  </Router>
);

export default App;