import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

//Pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Routes>
          <Route path="/" element={<home />} />
          <Route path="/login" element={<login />} />
          <Route path="/signup" element={<signup />} />
        </Routes>
      </div>
    );
  }
}

export default App;
