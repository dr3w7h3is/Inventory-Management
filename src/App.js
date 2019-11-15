import React from 'react';
import './App.css';
import data from './test-data.json';

function App() {
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
        <a href="localhost:3000/" class="w3-bar-item w3-button w3-padding w3-blue"><i class="fa fa-home fa-fw"></i>  Home</a>
        <a href="localhost:3000/" class="w3-bar-item w3-button w3-padding"><i class="fa fa-users fa-fw"></i>  Sections</a>
        <a href="localhost:3000/" class="w3-bar-item w3-button w3-padding"><i class="fa fa-user-circle fa-fw"></i>  Personel</a>
        <a href="localhost:3000/" class="w3-bar-item w3-button w3-padding"><i class="fa fa-cubes fa-fw"></i>  Equipment</a>
        <a href="localhost:3000/" class="w3-bar-item w3-button w3-padding"><i class="fa fa-calendar fa-fw"></i>  Calender</a>
        <a href="localhost:3000/" class="w3-bar-item w3-button w3-padding"><i class="fa fa-check-square fa-fw"></i>  Request</a>
        <a href="localhost:3000/" class="w3-bar-item w3-button w3-padding"><i class="fa fa-table fa-fw"></i>  Manage</a>
        <a href="localhost:3000/" class="w3-bar-item w3-button w3-padding"><i class="fa fa-gears fa-fw"></i>  Settings</a>
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
            <h6>IN:</h6>
            <h6>OUT:</h6>
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
            <h6>IN:</h6>
            <h6>OUT:</h6>
          </div>
          <div class="w3-clear"></div>
          <h4>Servers</h4>
        </div>
      </div>
      <div class="w3-quarter">
        <div class="w3-container w3-green w3-padding-16">
          <div class="w3-left w3-half"><i class="fa fa-wrench w3-xxxlarge"></i></div>
          <div class="w3-left">
            <h6>IN:</h6>
            <h6>OUT:</h6>
          </div>
          <div class="w3-clear"></div>
          <h4>Test Tools</h4>
        </div>
      </div>
      <div class="w3-quarter">
        <div class="w3-container w3-orange text-white w3-padding-16">
          <div class="w3-left w3-half"><i class="fa fa-users w3-xxxlarge"></i></div>
          <div class="w3-left">
            <h6>IN:</h6>
            <h6>OUT:</h6>
          </div>
          <div class="w3-clear"></div>
          <h4>Simulation Equipment</h4>
        </div>
      </div>
    </div>
    <hr></hr>
    <div class="main-body w3-container">
      <h5>Inventory</h5>
        <table class="w3-table w3-striped w3-bordered w3-border w3-hoverable w3-white">
          <tbody>
          <tr>
            <td>Control Number</td>
            <td>Nomenclature</td>
            <td>Manufacture</td>
            <td>Model</td>
            <td>Serial Number</td>
            <td>Ownership</td>
            <td>Current Possesion</td>
            <td>Location</td>
            <td>Description</td>
          </tr>
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

export default App;
