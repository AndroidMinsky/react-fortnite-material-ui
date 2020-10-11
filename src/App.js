import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";

import Home from "./components/Home";
import Items from "./components/Items";
import ItemView from "./components/ItemView";
import Modal from "./components/Modal";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <Router>
      <Navbar />
      <ModalSwitch />
    </Router>
  );
}

function ModalSwitch() {
  let location = useLocation();
  let background = location.state && location.state.background;

  return (
    <div>
      <Switch location={background || location}>
        <Route exact path="/" children={<Home />} />
        <Route path="/items" children={<Items />} />
        <Route path="/item/:id" children={<ItemView />} />
      </Switch>

      {background && <Route path="/item/:id" children={<Modal />} />}
    </div>
  );
}
