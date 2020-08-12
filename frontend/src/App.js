import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import authReducer from "./store/reducers/authReducer";
import DoYourPart from "./components/DoYourPart/DoYourPart";
import dypReducer from "./store/reducers/dypReducer";
import Footer from "./components/Navigation/Footer/Footer";
import Header from "./components/Navigation/Header/Header";
import Home from "./components/Home/Home";
import ScrollToTop from "./ScrollToTop";
import thunk from "redux-thunk";
import UserToolbar from "./components/Navigation/UserToolbar/UserToolbar";
import "./App.css";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
  auth: authReducer,
  dyp: dypReducer,
});
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
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
