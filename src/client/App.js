import React, { Component } from "react";

import { Link, Route } from "react-router-dom";

import "./App.css";
import { Tiles } from "./components/Tiles";
import { Equipment } from "./components/Equipment";
import { Manage } from "./components/Manage";
import { getCategories } from "./controller/api";
import { Calendar } from "./components/Calendar";
import { Home } from "./components/Home";

// Function to create elements in the checkout page
function CheckOut() {
  return (
    <div className="main-body w3-container">
      <h1>CheckOut</h1>
    </div>
  );
}

// Main class for page construction
class App extends Component {
  constructor(props) {
    super(props)
    this.handleDBUpdate = this.handleDBUpdate.bind(this)
    this.state = { categories: [] }
  }


  componentDidMount() {
    this.handleDBUpdate()
  }
  handleDBUpdate() {
    getCategories().then(d => this.setState({ categories: d }))
  }

  render() {
    return (
      <div>
        <div className="w3-bar w3-top w3-black w3-large">
          <span className="w3-bar-item w3-right">MCTSSA</span>
        </div>
        <nav className="w3-sidebar w3-collapse w3-light-gray" id="mySidebar">
          <br></br>
          <div className="w3-container">
            <h5>Dashboard</h5>
          </div>
          <div className="w3-bar-block">
            <Link to="/" className="w3-bar-item w3-button w3-padding">
              <i className="fa fa-home fa-fw"></i> Home
            </Link>
            <Link to="/equipment" className="w3-bar-item w3-button w3-padding">
              <i className="fa fa-cubes fa-fw"></i> Equipment
            </Link>
            <Link to="/calendar" className="w3-bar-item w3-button w3-padding">
              <i className="fa fa-calendar fa-fw"></i> Calendar
            </Link>
            <Link to="/checkout" className="w3-bar-item w3-button w3-padding">
              <i className="fa fa-check-square fa-fw"></i> CheckOut{" "}
            </Link>
            <Link to="/manage" className="w3-bar-item w3-button w3-padding">
              <i className="fa fa-table fa-fw"></i> Manage
            </Link>
          </div>
        </nav>
        <div className="w3-main">
          <header className="w3-container">
            <h5>
              <b>MCNEL Inventory Management System</b>
            </h5>
          </header>
        </div>
        <div className="quick-look w3-row-padding w3-margin-bottom">
          <Tiles categories={this.state.categories} />
        </div>
        <hr></hr>
        <Route exact path="/" component={Home} />
        <Route path="/equipment" render={(props) => <Equipment onDBUpdate={this.handleDBUpdate} {...props} />} />
        <Route path="/calendar" component={Calendar} />
        <Route path="/checkout" component={CheckOut} />
        <Route path="/manage" render={(props) => <Manage onDBUpdate={this.handleDBUpdate} {...props} />} />
        <hr></hr>
        <br></br>
      </div>
    );
  }
}

export default App;
