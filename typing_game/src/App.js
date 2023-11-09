import {
  BrowserRouter as Router,
  Route,
  Routes as Switch,
  Navigate as Redirect,
} from "react-router-dom";
import React, { Suspense, lazy } from "react";
import Loader from "./Loader";
import "./assets/css/main.css";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import TypingGame from "./components/TypingGame";
import History from "./components/History";
import "bootstrap/dist/css/bootstrap.min.css";
import ProtectedRoute from "./components/ProtectedRoute";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/signup" element={<Signup />} />
      <Route
        exact
        path="/typinggame"
        element={
          <ProtectedRoute>
            <TypingGame />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/history"
        element={
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        }
      />
      <Route exact path="/*" element={<Login />} />
    </Switch>
  );
};

function App() {
  return (
    <Router basename="/">
      <Suspense fallback={<Loader />}>
        <Routes />
      </Suspense>
    </Router>
  );
}

export default App;
