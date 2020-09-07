import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Navbar } from "./components/Navbar";
import { AlertState } from "./context/alert/AlertState";
import { FirebaseState } from "./context/Firebase/FirebaseState";
import { Cancelled } from "./components/Cancelled";
import { Completed } from "./components/Completed";

function App() {
  return (
    <FirebaseState>
      <AlertState>
        <BrowserRouter>
          <Navbar />
          <div className="container pt-4">
            <Switch>
              <Route path={"/"} exact component={Home} />
              <Route path={"/about"} component={About} />
              <Route path={"/cancelled"} component={Cancelled} />
              <Route path={"/completed"} component={Completed} />
            </Switch>
          </div>
        </BrowserRouter>
      </AlertState>
    </FirebaseState>
  );
}

export default App;
