import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import DoYourPart from "./components/DoYourPart/DoYourPart";
import dypReducer from "./store/reducers/dypReducer";
import Footer from "./components/Navigation/Footer/Footer";
import Header from "./components/Navigation/Header/Header";
import Home from "./components/Home/Home";
import ScrollToTop from "./ScrollToTop";
import UserToolbar from "./components/Navigation/UserToolbar/UserToolbar";
import "./App.css";

const store = createStore(
  dypReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <ScrollToTop />
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
    </Provider>
  );
}

export default App;
