import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import Header from './components/Header';
import Countries from './components/Countries';
import Country from './components/Country';

function BasicExample() {
  return (
    <Switch>
      <div>
       <Header />
        <Route exact path="/" component={Countries} />
        <Route exact path="/country" component={Country} />
      </div>
    </Switch>
  );
}

export default BasicExample;
