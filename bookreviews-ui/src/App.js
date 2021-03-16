import logo from "./logo.svg";
import "./App.css";
import React, { Component, Fragment } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import { Contxt } from "./components/context";

function App() {
  return (
    <Contxt>
      <Fragment>
        <Header />
        <Home />
      </Fragment>
    </Contxt>
  );
}

export default App;
