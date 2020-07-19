import React from "react";
import { BrowserRouter } from "react-router-dom";
import Footer from "./components/Navigation/Footer/Footer";
import Header from "./components/Navigation/Header/Header";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Header />
        {/* <Footer /> */}
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
