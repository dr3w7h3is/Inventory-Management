import React, {Component} from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import './App.css';
import data from './test-data.json';

const inNum = 43;
const outNum = 62;

const Blank = () => (
  <div>
</div>
)
const Home = () => (
  <div class="w3-center">
    <h1>Sections</h1>
  </div>
)
const Sections = () => (
  <div class="w3-center">
    <h1>Sections</h1>
  </div>
)
const Personnel = () => (
  <div class="w3-center">
    <h1>Personnel</h1>
  </div>
)
const Equipment = () => (
  <div class="main-body w3-container">
    <h5>Inventory</h5>
    <table class="w3-table w3-striped w3-bordered w3-border w3-hoverable w3-white">
      <thead>
        <tr>
          <th>Control Number</th>
          <th>Nomenclature</th>
          <th>Manufacture</th>
          <th>Model</th>
          <th>Serial Number</th>
          <th>Ownership</th>
          <th>Current Possesion</th>
          <th>Location</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{ data.database.item[0].ctrl_num }</td>
          <td>{ data.database.item[0].nomenclature }</td>
          <td>{ data.database.item[0].manufacture }</td>
          <td>{ data.database.item[0].model }</td>
          <td>{ data.database.item[0].serial_num }</td>
          <td>{ data.database.item[0].ownership }</td>
          <td>{ data.database.item[0].current }</td>
          <td>{ data.database.item[0].location }</td>
          <td>more...</td>
        </tr>
        <tr>
          <td>{ data.database.item[1].ctrl_num }</td>
          <td>{ data.database.item[1].nomenclature }</td>
          <td>{ data.database.item[1].manufacture }</td>
          <td>{ data.database.item[1].model }</td>
          <td>{ data.database.item[1].serial_num }</td>
          <td>{ data.database.item[1].ownership }</td>
          <td>{ data.database.item[1].current }</td>
          <td>{ data.database.item[1].location }</td>
          <td>more...</td>
        </tr>
        <tr>
          <td>{ data.database.item[2].ctrl_num }</td>
          <td>{ data.database.item[2].nomenclature }</td>
          <td>{ data.database.item[2].manufacture }</td>
          <td>{ data.database.item[2].model }</td>
          <td>{ data.database.item[2].serial_num }</td>
          <td>{ data.database.item[2].ownership }</td>
          <td>{ data.database.item[2].current }</td>
          <td>{ data.database.item[2].location }</td>
        <td>more...</td>
        </tr>
      </tbody>
    </table>
  </div> 
)
const Calendar = () => (
  <div class="w3-center">
    <h1>Calendar</h1>
  </div>
)
const Request = () => (
  <div class="w3-center">
    <h1>Request</h1>
  </div>
)
const Manage = () => (
  <div class="w3-center">
    <h1>Manage</h1>
  </div>
)
const Settings = () => (
  <div class="w3-center">
    <h1>Settings</h1>
  </div>
)

class App extends Component {
  render() {
  return (
  <div>
    <div class="w3-bar w3-top w3-black w3-large">
      <span class="w3-bar-item w3-right">MCTSSA</span>
    </div>
    <nav class="w3-sidebar w3-collapse w3-light-gray w3-animate-left" id="mySidebar"><br></br>
      <div class="w3-container">
        <h5>Dashboard</h5>
      </div>
      <div class="w3-bar-block">
        <Link to="/" class="w3-bar-item w3-button w3-padding w3-blue"><i class="fa fa-home fa-fw"></i>  Home</Link >
        <Link to="/sections" class="w3-bar-item w3-button w3-padding"><i class="fa fa-users fa-fw"></i>  Sections</Link>
        <a href="/personnel" class="w3-bar-item w3-button w3-padding"><i class="fa fa-user-circle fa-fw"></i>  Personnel</a >
        <Link to="/equipment" class="w3-bar-item w3-button w3-padding"><i class="fa fa-cubes fa-fw"></i>  Equipment</Link >
        <a href="/calendar" class="w3-bar-item w3-button w3-padding"><i class="fa fa-calendar fa-fw"></i>  Calendar</a >
        <a href="/request" class="w3-bar-item w3-button w3-padding"><i class="fa fa-check-square fa-fw"></i>  Request</a >
        <a href="/manage" class="w3-bar-item w3-button w3-padding"><i class="fa fa-table fa-fw"></i>  Manage</a >
        <a href="/settings" class="w3-bar-item w3-button w3-padding"><i class="fa fa-gears fa-fw"></i>  Settings</a >
      </div>
    </nav>
    <div class="w3-main">
      <header class="w3-container">
        <h5>
          <b>
            <span class="fa-stack fa-lg">
              <i class="fa fa-square fa-stack-2x icon-black"></i>
              <i class="fa fa-terminal fa-stack-1x fa-inverse"></i>
            </span>
            INV-MAN
          </b>
        </h5>
      </header>
    </div>
    <div class="quick-look w3-row-padding w3-margin-bottom">
      <div class="w3-quarter">
        <div class="w3-container w3-red w3-padding-16">
          <div class="w3-left w3-half"><i class="fa fa-cloud-download w3-xxxlarge"></i></div>
          <div class="w3-left">
            <h6>IN: { inNum }</h6>
            <h6>OUT: { outNum }</h6>
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
          <h4>Servers</h4>
        </div>
      </div>
      <div class="w3-quarter">
        <div class="w3-container w3-green w3-padding-16">
          <div class="w3-left w3-half"><i class="fa fa-wrench w3-xxxlarge"></i></div>
          <div class="w3-left">
            <h6>IN: { inNum }</h6>
            <h6>OUT: { outNum }</h6>
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
    <Route path="/" component={Blank} />
    <Route path="/home" component={Home} />
    <Route path="/sections" component={Sections} />
    <Route path="/personnel" component={Personnel} />
    <Route path="/equipment" component={Equipment} />
    <Route path="/calendar" component={Calendar} />
    <Route path="/request" component={Request} />
    <Route path="/manage" component={Manage} />
    <Route path="/settings" component={Settings} />
    <hr></hr>
      <br></br>
      <div class="main-body w3-container w3-dark-grey w3-padding-32">
        <div class="w3-row">
          <div class="w3-container w3-third">
            <h5 class="w3-bottombar border-red">Demographic</h5>
            <p>Language</p>
          </div>
          <div class="w3-container w3-third">
            <h5 class="w3-bottombar border-blue">System</h5>
            <p>Browser</p>
          </div>
          <div class="w3-container w3-third">
            <h5 class="w3-bottombar border-green">Target</h5>
            <p>Users</p>
          </div>
        </div>
      </div>
  </div>
  );
}
}

export default App;
