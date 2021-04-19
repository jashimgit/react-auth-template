import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { ProvideAuth } from "./Auth/Auth";
import PrivateRoute from "./Auth/PrivateRoute";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Home from "./Pages/Home/Home";
import Navbar from "./Pages/Shared/Navbar";
import Login from './Auth/Login';

function App() {
  return (
    <ProvideAuth>
      <Router>
        <Navbar />
      
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route  path="/login">
            <Login />
          </Route>

          <PrivateRoute path="/dashboard">
            <Dashboard />
          </PrivateRoute>
        </Switch>
      </Router>
    </ProvideAuth>
  );
}

export default App;
