import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import DoYourPart from "./components/DoYourPart/DoYourPart";
import Footer from "./components/Navigation/Footer/Footer";
import Header from "./components/Navigation/Header/Header";
import Home from "./components/Home/Home";
import UserToolbar from "./components/Navigation/UserToolbar/UserToolbar";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div>
        <UserToolbar />
        <Header />
        <div className="main-wrapper">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/doyourpart" exact component={DoYourPart} />
          </Switch>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
