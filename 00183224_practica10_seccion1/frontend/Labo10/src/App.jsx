// src/ app.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Protected from "./components/Protected.jsx";
import SignIn from "./components/signIn.jsx";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/protected" element={<Protected />} />
    </Routes>
  </Router>
);

export default App;