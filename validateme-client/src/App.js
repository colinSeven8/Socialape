import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { MuiThemeProvider as ThemeProvider } from "@material-ui/core/styles";
import { createTheme } from "@material-ui/core/styles";

//Components
import Navbar from "./components/Navbar";

//Pages
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";

const theme = createTheme({
  palette: {
    primary: {
      light: "#cfd8dc",
      main: "#607d8b",
      dark: "#263238",
      contrastText: "#fff",
    },
    secondary: {
      light: "#f5f5f5",
      main: "#9e9e9e",
      dark: "#212121",
      contrastText: "#fff",
    },
  },
  typography: {
    useNextVariants: true,
  },
});

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <Router>
            <Navbar />
            <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
            </div>
          </Router>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
