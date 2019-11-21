// Authors: Drew Theis, Deja Hansen
// Right: USMC
// Date Created: 20191120

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
    <tbody class="w3-striped">
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
  <div class="main-body w3-container">
    <h1>Home</h1>
    <p>Welcome to MCNEL's Inventory Management System</p>
    <p>This system is designed to manage the inventory of items within MCNEL.

      Network Equipment includes ...

      Test tools includes ... 

      Simulation Equipment includes ... 

    </p>
    <p>POC: Deja Hansen</p>
  </div>
  )
}
//Function to create and list items from database
function Equipment() {
  return (
    <div class="main-body w3-container">
      <h1>Inventory</h1>
      <table class="w3-table w3-bordered w3-border w3-hoverable w3-white">
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
  <div class="main-body w3-container">
    <h1>Calendar</h1>
    <div class="month">
      <ul>
        <li class="prev">&#10094;</li>
        <li class="next">&#10095;</li>
        <li>November<br></br><span>2019</span></li>
      </ul>
    </div>
    <ul class="weekdays">
      <li>Mon</li>
      <li>Tues</li>
      <li>Wed</li>
      <li>Thurs</li>
      <li>Fri</li>
      <li>Sat</li>
      <li>Sun</li>
    </ul>
    <ul class="days">
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
  <div class="main-body w3-container">
    <h1>CheckOut</h1>
  </div>
  )
}
// Function to create elements in Manage page
function Manage() {
  return (
  <div class="main-body w3-container">
    <h1>Manage</h1>
  </div>
  )
}

class App extends Component {
  render() {
  return (
  <div>
    <div class="w3-bar w3-top w3-black w3-large">
      <span class="w3-bar-item w3-right">MCTSSA</span>
    </div>
    <nav class="w3-sidebar w3-collapse w3-light-gray" id="mySidebar"><br></br>
      <div class="w3-container">
        <h5>Dashboard</h5>
      </div>
      <div class="w3-bar-block">
        <Link to="/home" class="w3-bar-item w3-button w3-padding"><i class="fa fa-home fa-fw"></i>  Home</Link >
        <Link to="/equipment" class="w3-bar-item w3-button w3-padding"><i class="fa fa-cubes fa-fw"></i>  Equipment</Link >
        <Link to="/calendar" class="w3-bar-item w3-button w3-padding"><i class="fa fa-calendar fa-fw"></i>  Calendar</Link >
        <Link to="/checkout" class="w3-bar-item w3-button w3-padding"><i class="fa fa-check-square fa-fw"></i>  CheckOut </Link >
        <Link to="/manage" class="w3-bar-item w3-button w3-padding"><i class="fa fa-table fa-fw"></i> Manage</Link >
      </div>
    </nav>
    <div class="w3-main">
      <header class="w3-container">
        <h5>
          <b>MCNEL Inventory Management System</b>
        </h5>
      </header>
    </div>
    <div class="quick-look w3-row-padding w3-margin-bottom">
      <div class="w3-quarter">
        <div class="w3-container w3-red w3-padding-16">
          <div class="w3-left w3-half"><i class="fa fa-cloud-download w3-xxxlarge"></i></div>
          <div class="w3-left">
            <h6>Routers IN: { inNum }</h6> 
            <h6>Switches IN: { outNum }</h6>
            <h6>Servers IN: { outNum }</h6>
          </div>
          <div class="w3-clear">
          <h4>Network Equipment</h4>
          </div>
        </div>
      </div>
      <div class="w3-quarter">
        <div class="w3-container w3-blue w3-padding-16">
          <div class="w3-left w3-half"><i class="fa fa-microchip w3-xxxlarge"></i></div>
          <div class="w3-left">
            <h6>IN: { inNum }</h6>
            <h6>OUT: { outNum }</h6>
          </div>
          <div class="w3-clear"></div>
          <h4>Other</h4>
        </div>
      </div>
      <div class="w3-quarter">
        <div class="w3-container w3-green w3-padding-16">
          <div class="w3-left w3-half"><i class="fa fa-wrench w3-xxxlarge"></i></div>
          <div class="w3-left">
            <h6>NTAPS IN: { inNum }</h6>
            <h6>Netpacks IN: { outNum }</h6>
            <h6>XXXXX IN: { outNum }</h6>
          </div>
          <div class="w3-clear"></div>
          <h4>Test Tools</h4>
        </div>
      </div>
      <div class="w3-quarter">
        <div class="w3-container w3-orange text-white w3-padding-16">
          <div class="w3-left w3-half"><i class="fa fa-users w3-xxxlarge"></i></div>
          <div class="w3-left">
            <h6>IN: { inNum }</h6>
            <h6>OUT: { outNum }</h6>
          </div>
          <div class="w3-clear"></div>
          <h4>Simulation Equipment</h4>
        </div>
      </div>
    </div>
    <hr></hr>
    <Route path="/home" component={Home} />
    <Route path="/equipment" component={Equipment} />
    <Route path="/calendar" component={Calendar} />
    <Route path="/checkout" component={CheckOut} />
    <Route path="/manage" component={Manage} />
    <hr></hr>
      <br></br>
      <div class="main-body w3-container w3-dark-grey w3-padding-32">
        <div class="w3-row">
         
        </div>
      </div>
  </div>
  );
}
}

export default App;