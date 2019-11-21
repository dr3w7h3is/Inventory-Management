import React, {Component} from 'react';
import { Link, Route } from 'react-router-dom';
import './App.css';
import data from './test-data.json';

//variables for out and in inventory 
//const total = data.database.length //DEJA TODO: Get this to work and calculate 
const inNum = 43;
const outNum = 62;
// Function to loop getting inventory items from database
function inventory() {
  return (data.database.item.map(x => (
    <tbody className="w3-striped">
      <tr>
        <td>{x.ctrl_num}</td>
        <td>{x.type}</td>
        <td>{x.manufacturer}</td>
        <td>{x.model}</td>
        <td>{x.serial_num}</td>
        <td>{x.owner}</td>
        <td>{x.location}</td>
        <td>More...</td>
      </tr>
    </tbody>
  )))
}
//Home Page Content 
function Home() {
  return (
  <div className="main-body w3-container">
    <h1>Home</h1>
    <p>Welcome to MCNEL's Inventory Management System</p>
    <p>This system is designed to manage the inventory of items within MCNEL.</p>
    <p>Network Equipment includes ...</p>
    <p>Test tools includes ... </p>
    <p>Simulation Equipment includes ...</p> 
    <p>POC: Deja Hansen</p>
  </div>
  )
}
//Function to create and list items from database
function Equipment() {
  return (
    <div className="main-body w3-container">
      <h1>Inventory</h1>
      <table className="w3-table w3-bordered w3-border w3-hoverable w3-white">
        <thead>
          <tr>
            <th>Control Number</th>
            <th>Type</th>
            <th>Manufacturer</th>
            <th>Model</th>
            <th>Serial Number</th>
            <th>Owner</th>
            <th>Location</th>
            <th>Description</th>
          </tr>
        </thead>
          {inventory()}
      </table>
    </div>
  )
}
//Calendar Page Content 
function Calendar() {
  return (
  <div className="main-body w3-container">
    <h1>Calendar</h1>
    <div className="month">
      <ul>
        <li className="prev">&#10094;</li>
        <li className="next">&#10095;</li>
        <li>November<br></br><span>2019</span></li>
      </ul>
    </div>
    <ul className="weekdays">
      <li>Mon</li>
      <li>Tues</li>
      <li>Wed</li>
      <li>Thurs</li>
      <li>Fri</li>
      <li>Sat</li>
      <li>Sun</li>
    </ul>
    <ul className="days">
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
      <li>7</li>
    </ul> 
  </div>
  )
}
// Function to create elements in the checkout page
function CheckOut() {
  return (
  <div className="main-body w3-container">
    <h1>CheckOut</h1>
  </div>
  )
}
// Function to create elements in Manage page
function Manage() {
  return (
  <div className="main-body w3-container">
    <h1>Manage</h1>
  </div>
  )
}
// Fucntion for creating tiles elements
function tiles() {
  var names = [
    {
      name: "Network Equipment",
      color: "red",
      symbol: "fa-cloud-download"
    },
    {
      name: "Other",
      color: "blue",
      symbol: "fa-microchip"
    },
    {
      name: "Test Tools",
      color: "green",
      symbol: "fa-wrench"
    },
    {
      name: "Simulation Tools",
      color: "orange",
      symbol: "fa-users"
    }
  ]
  return (names.map(x => (
    <div className="w3-quarter">
      <div className={`w3-container w3-${x.color} w3-padding-16 text-white`}>
        <div className="w3-left w3-half">
          <i className={`fa ${x.symbol} w3-xxxlarge`}></i>
        </div>
        <div className="w3-left">
          <h6>Routers IN: { inNum }</h6> 
          <h6>Switches IN: { outNum }</h6>
          <h6>Servers IN: { outNum }</h6>
        </div>
        <div className="w3-clear">
          <h4>{x.name}</h4>
        </div>
      </div>
    </div>
  )))
}
// Main class for page contruction
class App extends Component {
  render() {
  return (
  <div>
    <div className="w3-bar w3-top w3-black w3-large">
      <span className="w3-bar-item w3-right">MCTSSA</span>
    </div>
    <nav className="w3-sidebar w3-collapse w3-light-gray" id="mySidebar"><br></br>
      <div className="w3-container">
        <h5>Dashboard</h5>
      </div>
      <div className="w3-bar-block">
        <Link to="/home" className="w3-bar-item w3-button w3-padding"><i className="fa fa-home fa-fw"></i>  Home</Link >
        <Link to="/equipment" className="w3-bar-item w3-button w3-padding"><i className="fa fa-cubes fa-fw"></i>  Equipment</Link >
        <Link to="/calendar" className="w3-bar-item w3-button w3-padding"><i className="fa fa-calendar fa-fw"></i>  Calendar</Link >
        <Link to="/checkout" className="w3-bar-item w3-button w3-padding"><i className="fa fa-check-square fa-fw"></i>  CheckOut </Link >
        <Link to="/manage" className="w3-bar-item w3-button w3-padding"><i className="fa fa-table fa-fw"></i> Manage</Link >
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
      {tiles()}
    </div>
    <hr></hr>
    <Route path="/home" component={Home} />
    <Route path="/equipment" component={Equipment} />
    <Route path="/calendar" component={Calendar} />
    <Route path="/checkout" component={CheckOut} />
    <Route path="/manage" component={Manage} />
    <hr></hr>
    <br></br>
  </div>
  );}
}

export default App;