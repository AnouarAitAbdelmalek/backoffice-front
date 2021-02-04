import React from "react";
import { Switch, Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import "./App.css";

import Logout from "./logout/Logout";
import Login from "./login/Login";
import formulaire from "./formulaire/formulaire";
import ListAgent from "./formulaire/ListAgents";


function App() {

  let isLogged = sessionStorage.getItem('username') != null ? true : false;

  return (
    
    <Router>
      {isLogged = sessionStorage.getItem('username') != null ? true : false}
            <Switch>
              <Route path="/login" exact component={Login} >
              {isLogged=== true ? <Redirect to="/list" /> : ""}
              </Route>
              <Route path="/" exact >
              {isLogged=== false ? <Redirect to="/login" /> : <Redirect to="/list" />}
              </Route>
              <Route path="/form" exact component={formulaire} >
                {isLogged=== false ? <Redirect to="/login" /> : ""}
              </Route>
              <Route path="/list" exact component={ListAgent} >
                {isLogged=== false ? <Redirect to="/login" /> : ""}
              </Route>
              <Route path="/logout" exact component={Logout} >
              </Route>
            </Switch>
    </Router>
  );
}

export default App;
