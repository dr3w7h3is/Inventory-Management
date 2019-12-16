var http = require("http");
var fs = require("fs");
var url = require('url');
var Crypto = require("crypto-js");

var baseDir = process.cwd() + '/data/'
var dbFile = baseDir + "fake-data.json";

var recordsDB = initdb();

var categoryDB = [
  {
    key:'network',
    name: 'Network Equipment',
    color:'red',
    symbol:'fa-cloud-download'
  },
  {
    key:'server',
    name: 'Servers',
    color:'blue',
    symbol:'fa-microchip'
  },
  {
    key:'test',
    name: "Test Tools",
    color:'green',
    symbol:'fa-wrench'
  },
  {
    key:'simulation',
    name: "Simulation Tools",
    color:'orange',
    symbol:'fa-users'
  }
]

http
  .createServer(function (req, res) {
    res.setHeader("Content-Type", "application/json");
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')

    if (req.method === "POST") {
      handlePost(req,res)
    } else if (req.method === "GET") {
      handleGet(req,res)
    } else {
      res.statusCode = 405;
      res.end();
    }
  })
  .listen(8080);




function handleGet(req, res){
  if (req.url.toLowerCase() === "/dump") {
    res.end(JSON.stringify(recordsDB));
  }
  if (req.url.toLowerCase() === "/remove") {
    //
    res.statusCode = 501;
    res.end();
  }
  if (req.url.toLowerCase().includes("/category")) {
    var cat = url.parse(req.url).pathname.split('/').pop();
    if (cat === '') {
      res.end(JSON.stringify(getCategories()))
    } else {
      let records = getCategory(cat)
      res.end(JSON.stringify(records));
    }
  }
}

function getCategory(category) {
  return recordsDB.database.filter(record => record.type === category)
}

function getCategories() {
  return categoryDB
}

function handlePost(req, res){
  let body='';
  if (req.url.toLowerCase() === "/remove") {
    req.on("data", chunk => {
      body += chunk;
    });
    req.on("end", a => {
      res.write(body);
      delEnrtry(body);
      res.end();
    });
  }
  if (req.url.toLowerCase() === "/") {
    req.on("data", chunk => {
      body += chunk;
    });
    req.on("end", a => {
      res.write(body);
      let added = addRecord(body);
      if (!added)
        res.statusCode = 409
      else
        res.statusCode = 201
      res.end();
    });
  }
}


function getBySerial(serial) {
  return recordsDB.database.filter(r=>r.serial_num === serial)
}

function serialExists(serial){
  return getBySerial(serial).length>0
}

function addRecord(data) {
  let js = JSON.parse(data);
  if (serialExists(js.serial_num)) return false
  var cNum = recordsDB.database.length;
  cNum = Crypto.MD5(js.serial_num, "secret");
  //Remove slice if longer control number is desired
  js.ctrl_num = cNum.toString().slice(-10);
  recordsDB.database.push(js);
  fs.writeFileSync(dbFile, JSON.stringify(recordsDB), "utf8");
  return true
}

function initdb() {
  var raw = "";
  if (fs.existsSync(dbFile)) {
    raw = fs.readFileSync(dbFile, "utf8");
  } else if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir)
  }

  if (raw === "") {
    raw = {
      database: []
    };
  }
  return typeof raw === "string" ? JSON.parse(raw) : raw;
}

function delEnrtry(entryNum) {
  var raw = "";
  raw = fs.readFileSync(dbFile, "utf8");
  recordsDB.database = recordsDB.database.filter(r => r.ctrl_num !== entryNum)
  fs.writeFileSync(dbFile, JSON.stringify(recordsDB), "utf8");
}
